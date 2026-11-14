const Expenses = (() => {
  let saving = false;
  async function list() {
    return (await DB.all("expenses")).sort(
      (a, b) =>
        b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt),
    );
  }
  function filter(rows, f) {
    return rows.filter(
      (x) =>
        (!f.from || x.date >= f.from) &&
        (!f.to || x.date <= f.to) &&
        (!f.category || x.categoryId === f.category) &&
        (!f.payment || x.paymentMethod === f.payment) &&
        (!f.search ||
          `${x.merchant} ${x.description}`
            .toLowerCase()
            .includes(f.search.toLowerCase())),
    );
  }
  async function save(data, receiptRecords, removedReceiptIds = []) {
    if (saving) throw new Error("Please wait for the current save to finish.");
    saving = true;
    try {
      await DB.saveExpense(data, receiptRecords, removedReceiptIds);
    } finally {
      saving = false;
    }
  }
  async function remove(id) {
    await DB.deleteExpense(id);
  }
  function period(date, kind = "fixed") {
    if (kind === "fixed") {
      const day = Number(date.slice(8));
      return Math.floor((day - 1) / 7) + 1;
    }
    const d = Utils.parseDate(date),
      monday = new Date(d);
    const wd = (monday.getDay() + 6) % 7;
    monday.setDate(monday.getDate() - wd);
    return `week-${Utils.dateKey(monday)}`;
  }
  return { list, filter, save, remove, period };
})();
