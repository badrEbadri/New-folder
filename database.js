/* IndexedDB persistence. All values, including currency, are stored in integer cents. */
const DB_NAME = "spendwise-local",
  DB_VERSION = 1;
const DEFAULT_CATEGORIES = [
  ["Groceries", "🛒", "#51a88a"],
  ["Restaurants and food", "🍽️", "#f29b63"],
  ["Transportation", "🚇", "#6386d9"],
  ["Fuel", "⛽", "#df785f"],
  ["Shopping", "🛍️", "#ae7bd4"],
  ["Housing and rent", "⌂", "#71819a"],
  ["Electricity and water", "💧", "#55a9c5"],
  ["Internet and telephone", "⌁", "#7e8bd2"],
  ["Healthcare", "✚", "#59aa82"],
  ["Pharmacy", "⚕", "#72b990"],
  ["Education", "▤", "#daae5b"],
  ["Entertainment", "♫", "#d17baa"],
  ["Clothing", "♧", "#c37c75"],
  ["Household expenses", "⌂", "#9b9a71"],
  ["Family expenses", "♡", "#df8e90"],
  ["Subscriptions", "◉", "#738ab9"],
  ["Other", "•", "#9299a7"],
];
const DB = (() => {
  let dbp;
  function open() {
    if (!dbp)
      dbp = new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = () => {
          const d = req.result;
          const e = d.createObjectStore("expenses", { keyPath: "id" });
          e.createIndex("date", "date");
          e.createIndex("categoryId", "categoryId");
          e.createIndex("paymentMethod", "paymentMethod");
          const r = d.createObjectStore("receipts", { keyPath: "id" });
          r.createIndex("expenseId", "expenseId");
          d.createObjectStore("categories", { keyPath: "id" });
          const b = d.createObjectStore("budgets", { keyPath: "id" });
          b.createIndex("period", "period");
          d.createObjectStore("settings", { keyPath: "key" });
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
        req.onblocked = () =>
          reject(
            new Error(
              "Database is busy in another tab. Close other Spendwise tabs and try again.",
            ),
          );
      });
    return dbp;
  }
  async function run(store, mode, fn) {
    const d = await open();
    return new Promise((resolve, reject) => {
      const tx = d.transaction(store, mode),
        s = tx.objectStore(store);
      let result;
      try {
        result = fn(s, tx);
      } catch (e) {
        tx.abort();
        reject(e);
        return;
      }
      tx.oncomplete = () => resolve(result);
      tx.onerror = () =>
        reject(tx.error || new Error("Database request failed"));
      tx.onabort = () =>
        reject(tx.error || new Error("Database operation was cancelled"));
    });
  }
  async function all(store) {
    const d = await open();
    return new Promise((resolve, reject) => {
      const req = d.transaction(store).objectStore(store).getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }
  async function get(store, id) {
    const d = await open();
    return new Promise((resolve, reject) => {
      const req = d.transaction(store).objectStore(store).get(id);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
  const put = (store, value) => run(store, "readwrite", (s) => s.put(value));
  const del = (store, id) => run(store, "readwrite", (s) => s.delete(id));
  async function seed() {
    const c = await all("categories");
    if (!c.length) {
      const now = new Date().toISOString();
      await run("categories", "readwrite", (s) =>
        DEFAULT_CATEGORIES.forEach(([name, icon, color], i) =>
          s.put({
            id: "default-" + i,
            name,
            icon,
            color,
            createdAt: now,
            isDefault: true,
          }),
        ),
      );
    }
    if (!(await get("settings", "currency")))
      await put("settings", { key: "currency", value: "MAD" });
    if (!(await get("settings", "language")))
      await put("settings", { key: "language", value: "en" });
    if (!(await get("settings", "theme")))
      await put("settings", { key: "theme", value: "light" });
  }
  async function saveExpense(expense, receiptRecords, removedReceiptIds = []) {
    const d = await open();
    return new Promise((resolve, reject) => {
      const tx = d.transaction(["expenses", "receipts"], "readwrite"),
        es = tx.objectStore("expenses"),
        rs = tx.objectStore("receipts");
      try {
        es.put(expense);
        for (const rec of receiptRecords || []) rs.put(rec);
        for (const id of removedReceiptIds) rs.delete(id);
      } catch (e) {
        tx.abort();
        reject(e);
        return;
      }
      tx.oncomplete = () => resolve();
      tx.onerror = () =>
        reject(tx.error || new Error("Could not save expense"));
      tx.onabort = () => reject(tx.error || new Error("Save was cancelled"));
    });
  }
  async function deleteExpense(id) {
    const d = await open();
    return new Promise((resolve, reject) => {
      const tx = d.transaction(["expenses", "receipts"], "readwrite"),
        rs = tx.objectStore("receipts"),
        req = rs.index("expenseId").openCursor(IDBKeyRange.only(id));
      req.onsuccess = () => {
        const cur = req.result;
        if (cur) {
          cur.delete();
          cur.continue();
        }
      };
      tx.objectStore("expenses").delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () =>
        reject(tx.error || new Error("Could not delete expense"));
    });
  }
  async function importBundle(bundle) {
    const d = await open();
    return new Promise((resolve, reject) => {
      const tx = d.transaction(
        ["expenses", "receipts", "categories", "budgets", "settings"],
        "readwrite",
      );
      const map = {
        expenses: "expenses",
        receipts: "receipts",
        categories: "categories",
        budgets: "budgets",
        settings: "settings",
      };
      try {
        for (const [key, store] of Object.entries(map))
          for (const row of bundle[key] || []) tx.objectStore(store).put(row);
      } catch (e) {
        tx.abort();
        reject(e);
        return;
      }
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error || new Error("Restore failed"));
    });
  }
  return {
    open,
    all,
    get,
    put,
    del,
    seed,
    saveExpense,
    deleteExpense,
    importBundle,
  };
})();
