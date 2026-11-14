const App = {
  settings: { currency: "MAD", language: "en", theme: "light" },
  categories: [],
  expenses: [],
  pendingPhotos: [],
  removedReceiptIds: [],
  reportMode: "monthly",
  currentView: "dashboard",
  initialized: false,
};
const I18N = {
  fr: {
    dashboard: "Tableau de bord",
    expenses: "Dépenses",
    reports: "Rapports",
    budgets: "Budgets",
    settings: "Réglages",
    private: "Privé par conception",
    stored: "Vos données restent sur cet appareil",
    addExpense: "Ajouter une dépense",
    overview: "Vos finances en un coup d’œil",
    overviewSub: "Une vue claire de vos dépenses, au même endroit.",
    reportingMonth: "Mois du rapport",
    monthlyTrend: "Dépenses mensuelles",
    monthlyTrendSub: "Totaux journaliers du mois sélectionné",
    categories: "Dépenses par catégorie",
    categoriesSub: "Où va votre argent",
    weeklyCompare: "Comparaison hebdomadaire",
    weeklyCompareSub: "Périodes de rapport fixes",
    recent: "Transactions récentes",
    recentSub: "Votre activité récente",
    viewAll: "Tout voir →",
    historyTitle: "Historique des transactions",
    historySub: "Recherchez, filtrez et gérez chaque dépense.",
    search: "Rechercher",
    from: "Du",
    to: "Au",
    category: "Catégorie",
    payment: "Paiement",
    clear: "Effacer",
    noExpenses: "Aucune dépense trouvée",
    noExpensesSub: "Modifiez les filtres ou ajoutez une dépense.",
    reportsTitle: "Rapports",
    reportsSub: "Explorez les dépenses par jour, semaine et mois.",
    downloadReport: "Télécharger le rapport",
    fixedWeeks: "Semaines fixes",
    calendarWeeks: "Semaines calendrier",
    dailyReport: "Rapport journalier",
    dailyReportSub: "Choisissez une date pour voir l’activité",
    paymentMix: "Modes de paiement",
    paymentMixSub: "Répartition du mois sélectionné",
    budgetTitle: "Budgets",
    budgetSub: "Définissez des limites souples et suivez vos dépenses.",
    monthlyBudget: "Budget mensuel",
    monthlyBudgetSub: "Votre objectif global",
    weeklyBudget: "Budget hebdomadaire",
    weeklyBudgetSub: "Objectif par période",
    amount: "Montant",
    saveBudget: "Enregistrer le budget",
    categoryBudgets: "Budgets par catégorie",
    categoryBudgetsSub: "Limites mensuelles facultatives",
    addBudget: "Ajouter",
    settingsTitle: "Réglages et données",
    settingsSub: "Gérez vos préférences et gardez une copie de vos données.",
    preferences: "Préférences",
    preferencesSub: "Personnalisez Spendwise",
    currency: "Devise",
    currencySub: "Utilisée dans tous les rapports",
    language: "Langue",
    languageSub: "Langue de l’interface",
    appearance: "Apparence",
    appearanceSub: "Choisissez un thème",
    backupTitle: "Sauvegarde et export",
    backupSub:
      "Vos données restent sur cet appareil. Sauvegardez régulièrement.",
    exportCsv: "Exporter les dépenses en CSV",
    fullBackup: "Télécharger la sauvegarde complète (JSON)",
    exportReceipts: "Exporter les reçus",
    restoreBackup: "Restaurer une sauvegarde",
    restoreNote: "Les données restaurées sont ajoutées aux données existantes.",
    categoriesManage: "Catégories",
    categoriesManageSub: "Créez et organisez vos catégories",
    addCategory: "Ajouter",
    privacyTitle: "Vos données vous appartiennent",
    privacyText:
      "Tout est stocké localement dans ce navigateur. Effacer le stockage du navigateur ou désinstaller l’application peut supprimer vos données. Exportez une sauvegarde régulièrement.",
    storageUsed: "Stockage utilisé",
    date: "Date",
    merchant: "Commerce / magasin",
    description: "Description",
    receipts: "Photos de reçu",
    receiptsOptional: "Facultatif · compressées et stockées sur cet appareil",
    addPhoto: "Ajouter des photos",
    scanReceipt: "Lire le reçu (OCR)",
    cancel: "Annuler",
  },
};
const EN = {
  dashboard: "Dashboard", expenses: "Expenses", reports: "Reports", budgets: "Budgets", settings: "Settings",
  private: "Private by design", stored: "Your data stays on this device", addExpense: "Add expense",
  overview: "Your money, at a glance", overviewSub: "A clear view of your spending, all in one place.", reportingMonth: "Reporting month",
  monthlyTrend: "Monthly spending", monthlyTrendSub: "Daily totals for the selected month", categories: "Spending by category", categoriesSub: "Where your money goes",
  weeklyCompare: "Weekly comparison", weeklyCompareSub: "Fixed reporting periods", monthlyCompare: "Monthly comparison", monthlyCompareSub: "Monthly totals over the last six months",
  dailyAverages: "Daily average trend", dailyAveragesSub: "Monthly spending divided by all days", recent: "Recent transactions", recentSub: "Your latest activity", viewAll: "View all →",
  historyTitle: "Transaction history", historySub: "Search, filter and manage every expense.", search: "Search", from: "From", to: "To", category: "Category", payment: "Payment", clear: "Clear",
  noExpenses: "No expenses found", noExpensesSub: "Try adjusting your filters or add an expense.", reportsTitle: "Reports", reportsSub: "Explore spending by day, week and month.", downloadReport: "Download report",
  fixedWeeks: "Monthly fixed weeks", calendarWeeks: "Calendar weeks", dailyReport: "Daily report", dailyReportSub: "Select a date to inspect activity", paymentMix: "Payment methods", paymentMixSub: "Selected month breakdown",
  budgetTitle: "Budgets", budgetSub: "Set flexible limits and keep an eye on your pace.", monthlyBudget: "Monthly budget", monthlyBudgetSub: "Your overall spending target", weeklyBudget: "Weekly budget", weeklyBudgetSub: "Target for each reporting period",
  amount: "Amount", saveBudget: "Save budget", categoryBudgets: "Category budgets", categoryBudgetsSub: "Optional monthly limits by category", addBudget: "Add budget",
  settingsTitle: "Settings & data", settingsSub: "Manage your preferences and keep a safe copy of your records.", preferences: "Preferences", preferencesSub: "Personalize Spendwise",
  currency: "Currency", currencySub: "Used for all totals and reports", language: "Language", languageSub: "Interface language", appearance: "Appearance", appearanceSub: "Choose a comfortable theme",
  backupTitle: "Backup & export", backupSub: "Your records stay on this device. Make regular backups.", exportCsv: "Export expenses as CSV", fullBackup: "Download full backup (JSON)", exportReceipts: "Export receipts", restoreBackup: "Restore backup",
  restoreNote: "Restored records are added alongside existing data. Duplicate IDs are replaced after confirmation.", categoriesManage: "Categories", categoriesManageSub: "Create and organize your expense categories", addCategory: "Add category",
  privacyTitle: "Your data belongs to you", privacyText: "Everything is stored locally in this browser. Clearing browser storage or uninstalling the app can remove your records. Export a backup regularly.", storageUsed: "Storage used",
  date: "Date", merchant: "Merchant / store", description: "Description", receipts: "Receipt photos", receiptsOptional: "Optional · images are compressed and stored on this device", addPhoto: "Add photos", scanReceipt: "Read receipt (OCR)", cancel: "Cancel",
  todayTotal: "Today", thisWeek: "This week", thisMonth: "This month", transactions: "Transactions", dailyAverage: "Daily average", highestDay: "Highest day", budgetRemaining: "Budget remaining",
  remaining: "remaining", perDay: "per day", inThisMonth: "in this month", highestExpense: "Highest expense", lowestExpense: "Lowest expense", spent: "Spent", noBudget: "No budget set yet.", noCategoryBudgets: "No category budgets yet.",
  month: "Month", week: "Reporting week", exportWeekly: "Weekly CSV", exportMonthly: "Monthly CSV", dailyCsv: "Daily CSV"
};
function t(key) {
  return I18N[App.settings.language]?.[key] || EN[key] || key;
}
function translate() {
  document.documentElement.lang = App.settings.language;
  Utils.$$("[data-i18n]").forEach(
    (el) => (el.textContent = t(el.dataset.i18n)),
  );
}
function categoryName(id) {
  return App.categories.find((x) => x.id === id)?.name || "Other";
}
function categoryIcon(id) {
  return App.categories.find((x) => x.id === id)?.icon || "•";
}
function categoryColor(id) {
  const value = App.categories.find((x) => x.id === id)?.color || "#9299a7";
  return /^#[0-9a-f]{3,8}$/i.test(value) ? value : "#9299a7";
}
function showView(view) {
  App.currentView = view;
  Utils.$$(".view").forEach((x) =>
    x.classList.toggle("active", x.id === `view-${view}`),
  );
  Utils.$$("[data-view]").forEach((x) =>
    x.classList.toggle("active", x.dataset.view === view),
  );
  const titles = {
    dashboard: t("dashboard"),
    expenses: t("expenses"),
    reports: t("reports"),
    budgets: t("budgets"),
    settings: t("settings"),
  };
  Utils.$("#page-title").textContent = titles[view] || titles.dashboard;
  document.body.classList.remove("menu-open");
  if (view === "reports") renderReports();
  if (view === "budgets") renderBudgets();
  if (view === "settings") renderSettings();
}
function renderStats(month) {
  const today = Utils.today(),
    rows = App.expenses,
    weekStart = (() => {
      const d = Utils.parseDate(today);
      d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
      return Utils.dateKey(d);
    })();
  const todayTotal = Reports.sum(rows.filter((x) => x.date === today)),
    weekTotal = Reports.sum(
      rows.filter((x) => x.date >= weekStart && x.date <= today),
    ),
    monthRows = Reports.inMonth(rows, month),
    monthTotal = Reports.sum(monthRows),
    days = Utils.daysInMonth(...month.split("-").map(Number));
  const activeDays = Math.max(1, days),
    high = (() => {
      const groups = Reports.dailySeries(rows, month).filter((x) => x.total);
      return groups.sort((a, b) => b.total - a.total)[0];
    })();
  const mb = App.budgets.find((b) => b.id === "monthly"),
    remain = mb ? mb.amount - monthTotal : null;
  const items = [
    [t("todayTotal"), todayTotal, "◷", "blue"],
    [t("thisWeek"), weekTotal, "↗", "green"],
    [t("thisMonth"), monthTotal, "▤", "purple"],
    [t("transactions"), rows.length, "≋", "orange"],
    [t("dailyAverage"), Math.round(monthTotal / activeDays), "◌", "teal"],
    [t("highestDay"), high ? high.total : 0, "↑", "rose"],
  ];
  if (remain !== null)
    items.push([
      t("budgetRemaining"),
      remain,
      "◷",
      remain < 0 ? "rose" : "green",
    ]);
  Utils.$("#dashboard-stats").innerHTML = items
    .map(
      ([label, val, icon, color], i) =>
        `<article class="card stat-card ${color}"><div class="stat-top"><span>${Utils.escapeHtml(label)}</span><span class="stat-icon">${icon}</span></div><strong>${i === 3 ? val.toLocaleString() : Utils.currency(val)}</strong>${i === 5 && high ? `<small>${Utils.fmtDate(high.date)}</small>` : i === 6 ? `<small>${remain < 0 ? "Over budget" : t("remaining")}</small>` : i === 4 ? `<small>${t("perDay")}</small>` : ""}</article>`,
    )
    .join("");
  Utils.$("#month-total-tag").textContent = Utils.currency(monthTotal);
}
function itemHtml(x) {
  return `<div class="transaction-row"><div class="category-badge" style="--category-color:${categoryColor(x.categoryId)}">${Utils.escapeHtml(categoryIcon(x.categoryId))}</div><div class="transaction-main"><strong>${Utils.escapeHtml(x.merchant || x.description || categoryName(x.categoryId))}</strong><small>${Utils.escapeHtml(categoryName(x.categoryId))} · ${Utils.fmtDate(x.date)} · ${Utils.escapeHtml(x.paymentMethod)}</small></div>${x.receiptIds?.length ? `<button class="receipt-indicator" data-view-receipts="${Utils.escapeHtml(x.id)}" title="View receipt photos" aria-label="View receipt photos">▧</button>` : ""}<strong class="transaction-amount">− ${Utils.currency(x.amount, x.currency)}</strong><div class="row-actions"><button data-edit="${Utils.escapeHtml(x.id)}" aria-label="Edit">✎</button><button data-delete="${Utils.escapeHtml(x.id)}" aria-label="Delete">×</button></div></div>`;
}
function renderDashboard() {
  const month = Utils.$("#dash-month").value || Utils.monthKey(new Date());
  renderStats(month);
  Charts.render(App.expenses, month, App.categories);
  Utils.$("#recent-list").innerHTML =
    App.expenses.slice(0, 6).map(itemHtml).join("") ||
    `<div class="empty-mini">${t("noExpenses")}</div>`;
}
function filterRows() {
  const f = {
    from: Utils.$("#filter-from").value,
    to: Utils.$("#filter-to").value,
    category: Utils.$("#filter-category").value,
    payment: Utils.$("#filter-payment").value,
    search: Utils.$("#filter-search").value,
  };
  let rows = Expenses.filter(App.expenses, f);
  const month = Utils.$("#filter-month").value;
  const week = Utils.$("#filter-week").value;
  if (month) rows = rows.filter((x) => x.date.startsWith(month));
  if (week) rows = rows.filter((x) => (!month || x.date.startsWith(month)) && Expenses.period(x.date, "fixed") === Number(week));
  Utils.$("#history-list").innerHTML = rows.map(itemHtml).join("");
  Utils.$("#history-empty").hidden = rows.length > 0;
}
function renderReports() {
  const month = Utils.$("#report-month").value || Utils.monthKey(new Date()),
    periods =
      App.reportMode === "monthly"
        ? Reports.fixedPeriods(month)
        : Reports.calendarPeriods(month),
    stats = periods.map((p) => Reports.periodStats(App.expenses, p)),
    monthRows = Reports.inMonth(App.expenses, month),
    total = Reports.sum(monthRows);
  Utils.$("#report-summary").innerHTML =
    `<div class="report-total"><span>${Utils.escapeHtml(month)}</span><strong>${Utils.currency(total)}</strong><small>${monthRows.length} ${t("transactions").toLowerCase()}</small></div><div class="report-total"><span>${t("dailyAverage")}</span><strong>${Utils.currency(Math.round(total / Utils.daysInMonth(...month.split("-").map(Number))))}</strong><small>${t("perDay")}</small></div><div class="report-total"><span>${t("categories")}</span><strong>${new Set(monthRows.map((x) => x.categoryId)).size}</strong><small>${t("inThisMonth")}</small></div>`;
  Utils.$("#period-grid").innerHTML = stats
    .map(
      (s, i) =>
        `<details class="card period-card" ${i === 0 ? "open" : ""}><summary><span class="period-number">${App.reportMode === "monthly" ? `0${i + 1}` : "↳"}</span><span class="period-name"><strong>${Utils.escapeHtml(s.label)}</strong><small>${Utils.fmtDate(s.start, { month: "short", day: "numeric" })} – ${Utils.fmtDate(s.end, { month: "short", day: "numeric" })} · ${s.count} ${t("transactions").toLowerCase()}</small></span><strong class="period-total">${Utils.currency(s.total)}</strong><span class="expand-mark">⌄</span></summary><div class="period-detail"><div class="period-metrics"><span>${t("dailyAverage")} <b>${Utils.currency(s.average)}</b></span><span>${t("highestExpense")} <b>${Utils.currency(s.highest)}</b></span><span>${t("lowestExpense")} <b>${s.count ? Utils.currency(s.lowest) : "—"}</b></span></div>${s.categories.length ? `<div class="category-breakdown">${s.categories.map((c) => `<span>${Utils.escapeHtml(categoryName(c.key))}<b>${Utils.currency(c.value)}</b></span>`).join("")}</div>` : ""}<div class="transaction-list">${s.expenses.map(itemHtml).join("") || `<div class="empty-mini">${t("noExpenses")}</div>`}</div></div></details>`,
    )
    .join("");
  if (!Utils.$("#daily-date").value)
    Utils.$("#daily-date").value = Utils.today();
  renderDay();
  Charts.render(App.expenses, month, App.categories);
}
function renderDay() {
  const date = Utils.$("#daily-date").value || Utils.today(),
    s = Reports.day(App.expenses, date);
  Utils.$("#daily-detail").innerHTML =
    `<div class="day-total"><strong>${Utils.currency(s.total)}</strong><span>${s.count} ${t("transactions").toLowerCase()}</span></div><div class="day-breakdowns"><div><h4>${t("category")}</h4>${s.categories.map((x) => `<span>${Utils.escapeHtml(categoryName(x.key))}<b>${Utils.currency(x.value)}</b></span>`).join("") || `<small>${t("noExpenses")}</small>`}</div><div><h4>${t("payment")}</h4>${s.payments.map((x) => `<span>${Utils.escapeHtml(x.key)}<b>${Utils.currency(x.value)}</b></span>`).join("") || `<small>${t("noExpenses")}</small>`}</div></div><div class="transaction-list">${s.expenses.map(itemHtml).join("")}</div>`;
}
function renderBudgets() {
  const month = Utils.monthKey(new Date()),
    monthly = App.budgets.find((b) => b.id === "monthly"),
    weekly = App.budgets.find((b) => b.id === "weekly"),
    actual = Reports.sum(Reports.inMonth(App.expenses, month)),
    day = Number(Utils.today().slice(-2)),
    weeklyActual = Reports.sum(
      App.expenses.filter(
        (x) =>
          x.date >= Utils.addDays(Utils.today(), -(day - 1) % 7) &&
          x.date <= Utils.today(),
      ),
    );
  Utils.$("#monthly-budget-amount").value = monthly
    ? Utils.amount(monthly.amount)
    : "";
  Utils.$("#weekly-budget-amount").value = weekly
    ? Utils.amount(weekly.amount)
    : "";
  Utils.$("#monthly-budget-card").innerHTML = monthly
    ? budgetProgress(monthly.amount, actual)
    : `<p class="small-note">${t("noBudget")}</p>`;
  Utils.$("#weekly-budget-card").innerHTML = weekly
    ? budgetProgress(weekly.amount, weeklyActual)
    : `<p class="small-note">${t("noBudget")}</p>`;
  const cats = App.budgets.filter((b) => b.period === "category");
  Utils.$("#category-budget-list").innerHTML =
    cats
      .map((b) => {
        const total = Reports.sum(
          Reports.inMonth(App.expenses, month).filter(
            (x) => x.categoryId === b.categoryId,
          ),
        );
        return `<div class="budget-row"><div><strong>${Utils.escapeHtml(categoryName(b.categoryId))}</strong><small>${Utils.currency(total)} / ${Utils.currency(b.amount)}</small></div>${budgetProgress(b.amount, total)}<button data-budget-delete="${Utils.escapeHtml(b.id)}" class="row-delete" aria-label="Delete budget">×</button></div>`;
      })
      .join("") || `<p class="small-note">${t("noCategoryBudgets")}</p>`;
}
function budgetProgress(limit, actual) {
  const pct = limit ? Math.round((actual / limit) * 100) : 0,
    cls = pct >= 100 ? "danger" : pct >= 90 ? "high" : pct >= 80 ? "warn" : "";
  return `<div class="budget-progress ${cls}"><div class="budget-values"><span>${t("spent")} <b>${Utils.currency(actual)}</b></span><span>${pct}%</span></div><div class="progress-track"><i style="width:${Math.min(100, pct)}%"></i></div><small>${Utils.currency(Math.max(0, limit - actual))} ${t("remaining")}</small></div>`;
}
async function refresh() {
  [App.expenses, App.categories, App.budgets] = await Promise.all([
    DB.all("expenses"),
    DB.all("categories"),
    DB.all("budgets"),
  ]);
  App.expenses.sort(
    (a, b) =>
      b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt),
  );
  populateSelects();
  renderDashboard();
  filterRows();
  if (App.currentView === "reports") renderReports();
  if (App.currentView === "budgets") renderBudgets();
}
function populateSelects() {
  const opts = App.categories
    .map(
      (c) =>
        `<option value="${Utils.escapeHtml(c.id)}">${Utils.escapeHtml(c.icon || "•")} ${Utils.escapeHtml(c.name)}</option>`,
    )
    .join("");
  for (const id of ["expense-category", "filter-category", "budget-category"]) {
    const el = Utils.$("#" + id),
      v = el.value;
    el.innerHTML =
      (id === "filter-category"
        ? '<option value="">All categories</option>'
        : "") + opts;
    if (v) el.value = v;
  }
  const pay = Utils.$("#filter-payment"),
    pv = pay.value;
  pay.innerHTML =
    '<option value="">All methods</option>' +
    ["Cash", "Bank card", "Bank transfer", "Mobile payment", "Other"]
      .map((x) => `<option>${x}</option>`)
      .join("");
  pay.value = pv;
}
async function openExpense(id) {
  App.pendingPhotos = [];
  App.removedReceiptIds = [];
  const form = Utils.$("#expense-form");
  form.reset();
  Utils.$("#expense-id").value = "";
  Utils.$("#expense-date").value = Utils.today();
  Utils.$("#receipt-previews").innerHTML = "";
  Utils.$("#ocr-status").textContent = "";
  Utils.$("#expense-dialog-title").textContent = id
    ? "Edit expense"
    : "Add expense";
  Utils.$("#form-eyebrow").textContent = id
    ? "EDIT TRANSACTION"
    : "NEW TRANSACTION";
  if (id) {
    const x = await DB.get("expenses", id);
    if (!x) return;
    Utils.$("#expense-id").value = x.id;
    Utils.$("#expense-amount").value = Utils.amount(x.amount);
    Utils.$("#expense-date").value = x.date;
    Utils.$("#expense-category").value = x.categoryId;
    Utils.$("#expense-payment").value = x.paymentMethod;
    Utils.$("#expense-merchant").value = x.merchant || "";
    Utils.$("#expense-description").value = x.description || "";
    const receipts = await Receipts.forExpense(id);
    App.pendingPhotos = receipts.map((r) => ({ ...r, blob: r.imageBlob, existing: true }));
  }
  renderReceiptPreviews();
  Utils.$("#expense-dialog").showModal();
}
function renderReceiptPreviews() {
  const box = Utils.$("#receipt-previews");
  box.innerHTML = App.pendingPhotos
    .map(
      (r, i) =>
        `<div class="receipt-thumb"><img src="${Receipts.previewUrl(r.blob)}" alt="Receipt photo"><button type="button" data-photo-remove="${i}" aria-label="Remove photo">×</button></div>`,
    )
    .join("");
}
async function openReceiptViewer(expenseId) {
  const records = await Receipts.forExpense(expenseId), gallery = Utils.$("#receipt-gallery");
  gallery.innerHTML = records.map((r) => `<img src="${Receipts.previewUrl(r.imageBlob)}" alt="Receipt photo">`).join("");
  Utils.$("#receipt-dialog").showModal();
}
async function submitExpense(ev) {
  ev.preventDefault();
  const id = Utils.$("#expense-id").value || Utils.uid(),
    old =
      id !== Utils.$("#expense-id").value ? null : await DB.get("expenses", id),
    now = new Date().toISOString(),
    recIds = [];
  const records = App.pendingPhotos.map((r) => {
    const rec = {
      id: r.id || Utils.uid(),
      expenseId: id,
      imageBlob: r.blob,
      fileName: r.fileName || "receipt.jpg",
      mimeType: r.mimeType || r.blob.type,
      createdAt: r.createdAt || now,
    };
    recIds.push(rec.id);
    return rec;
  });
  const data = {
    id,
    amount: Utils.cents(Utils.$("#expense-amount").value),
    currency: App.settings.currency,
    date: Utils.$("#expense-date").value,
    categoryId: Utils.$("#expense-category").value,
    paymentMethod: Utils.$("#expense-payment").value,
    merchant: Utils.$("#expense-merchant").value.trim(),
    description: Utils.$("#expense-description").value.trim(),
    receiptIds: recIds,
    createdAt: old?.createdAt || now,
    updatedAt: now,
  };
  if (data.amount <= 0) {
    Utils.toast("Enter an amount greater than zero.", "error");
    return;
  }
  try {
    await Expenses.save(data, records, App.removedReceiptIds);
    Utils.$("#expense-dialog").close();
    await refresh();
    Utils.toast(old ? "Expense updated" : "Expense saved");
  } catch (e) {
    Utils.toast(e.message || "Could not save expense.", "error");
  }
}
async function onDelete(id) {
  if (
    !(await Utils.confirmed(
      "Delete this expense?",
      "This transaction and its receipt photos will be permanently deleted.",
    ))
  )
    return;
  try {
    await Expenses.remove(id);
    await refresh();
    Utils.toast("Expense deleted");
  } catch (e) {
    Utils.toast(e.message, "error");
  }
}
function renderSettings() {
  Utils.$("#currency-select").value = App.settings.currency;
  Utils.$("#language-select").value = App.settings.language;
  Utils.$("#theme-select").value = App.settings.theme;
  Utils.$("#category-list").innerHTML = App.categories
    .map(
      (c) =>
        `<div class="manage-row"><span class="category-badge" style="--category-color:${categoryColor(c.id)}">${Utils.escapeHtml(c.icon || "•")}</span><strong>${Utils.escapeHtml(c.name)}</strong>${c.isDefault ? "<small>Default</small>" : '<div><button data-cat-edit="' + Utils.escapeHtml(c.id) + '">Rename</button><button data-cat-delete="' + Utils.escapeHtml(c.id) + '">Delete</button></div>'}</div>`,
    )
    .join("");
  if (navigator.storage?.estimate)
    navigator.storage
      .estimate()
      .then(
        (x) =>
          (Utils.$("#storage-usage").textContent =
            `${(x.usage / 1024 / 1024).toFixed(1)} MB`),
      );
  else Utils.$("#storage-usage").textContent = "IndexedDB";
}
function applyTheme() {
  document.documentElement.dataset.theme = App.settings.theme;
}
function initEvents() {
  document.addEventListener("click", async (e) => {
    const view = e.target.closest("[data-view]");
    if (view) {
      showView(view.dataset.view);
      return;
    }
    if (e.target.closest("#header-add,#expenses-add")) {
      openExpense();
      return;
    }
    const edit = e.target.closest("[data-edit]");
    if (edit) {
      openExpense(edit.dataset.edit);
      return;
    }
    const receipts = e.target.closest("[data-view-receipts]");
    if (receipts) {
      openReceiptViewer(receipts.dataset.viewReceipts);
      return;
    }
    const del = e.target.closest("[data-delete]");
    if (del) {
      onDelete(del.dataset.delete);
      return;
    }
    const pd = e.target.closest("[data-photo-remove]");
    if (pd) {
      const i = Number(pd.dataset.photoRemove),
        r = App.pendingPhotos.splice(i, 1)[0];
      if (r?.existing) App.removedReceiptIds.push(r.id);
      renderReceiptPreviews();
      return;
    }
    const budgetDel = e.target.closest("[data-budget-delete]");
    if (budgetDel) {
      await DB.del("budgets", budgetDel.dataset.budgetDelete);
      refresh();
      return;
    }
    const mode = e.target.closest("[data-report-mode]");
    if (mode) {
      App.reportMode = mode.dataset.reportMode;
      Utils.$$("[data-report-mode]").forEach((x) =>
        x.classList.toggle("selected", x === mode),
      );
      renderReports();
      return;
    }
    const catEdit = e.target.closest("[data-cat-edit]");
    if (catEdit) {
      const c = App.categories.find((x) => x.id === catEdit.dataset.catEdit),
        name = prompt("Rename category", c.name);
      if (name?.trim()) {
        c.name = name.trim();
        await DB.put("categories", c);
        refresh();
        renderSettings();
      }
      return;
    }
    const catDel = e.target.closest("[data-cat-delete]");
    if (catDel) {
      const used = App.expenses.some(
        (x) => x.categoryId === catDel.dataset.catDelete,
      );
      if (used) {
        const choices = App.categories.filter(
          (c) => c.id !== catDel.dataset.catDelete,
        );
        const answer = prompt(
          `This category is in use. Enter a replacement category name:\n${choices.map((c) => c.name).join(", ")}`,
        );
        const replacement = choices.find(
          (c) => c.name.toLowerCase() === answer?.trim().toLowerCase(),
        );
        if (!replacement) {
          Utils.toast(
            "Choose an existing category to reassign these expenses first.",
            "error",
          );
          return;
        }
        for (const x of App.expenses.filter(
          (x) => x.categoryId === catDel.dataset.catDelete,
        )) {
          x.categoryId = replacement.id;
          x.updatedAt = new Date().toISOString();
          await DB.put("expenses", x);
        }
      }
      await DB.del("categories", catDel.dataset.catDelete);
      refresh();
      renderSettings();
      return;
    }
    const close = e.target.closest("[data-close-dialog]");
    if (close) {
      Utils.$("#expense-dialog").close();
      return;
    }
    if (e.target.id === "theme-toggle") {
      setSetting("theme", App.settings.theme === "light" ? "dark" : "light");
    }
  });
  Utils.$("#expense-form").addEventListener("submit", submitExpense);
  Utils.$("#dash-month").addEventListener("change", renderDashboard);
  Utils.$("#report-month").addEventListener("change", renderReports);
  [
    "filter-search",
    "filter-from",
    "filter-to",
    "filter-month",
    "filter-week",
    "filter-category",
    "filter-payment",
  ].forEach((id) => Utils.$("#" + id).addEventListener("input", filterRows));
  Utils.$("#clear-filters").addEventListener("click", () => {
    [
      "filter-search",
      "filter-from",
      "filter-to",
      "filter-month",
      "filter-week",
      "filter-category",
      "filter-payment",
    ].forEach((id) => (Utils.$("#" + id).value = ""));
    filterRows();
  });
  Utils.$("#daily-date").addEventListener("change", renderDay);
  Utils.$("#prev-day").addEventListener("click", () => {
    Utils.$("#daily-date").value = Utils.addDays(
      Utils.$("#daily-date").value,
      -1,
    );
    renderDay();
  });
  Utils.$("#next-day").addEventListener("click", () => {
    Utils.$("#daily-date").value = Utils.addDays(
      Utils.$("#daily-date").value,
      1,
    );
    renderDay();
  });
  Utils.$("#receipt-input").addEventListener("change", async (e) => {
    for (const f of e.target.files) {
      try {
        const r = await Receipts.compress(f);
        App.pendingPhotos.push({ ...r, fileName: f.name });
      } catch (err) {
        Utils.toast(err.message, "error");
      }
    }
    e.target.value = "";
    renderReceiptPreviews();
  });
  Utils.$("#ocr-button").addEventListener("click", async () => {
    const r = App.pendingPhotos[0];
    if (!r) {
      Utils.toast("Add a receipt photo first.", "error");
      return;
    }
    const status = Utils.$("#ocr-status");
    status.textContent = "Reading receipt…";
    try {
      const found = await Receipts.ocr(r.blob);
      if (found.amount) Utils.$("#expense-amount").value = found.amount;
      if (found.date && /^\d{4}-\d\d-\d\d$/.test(found.date))
        Utils.$("#expense-date").value = found.date;
      if (found.merchant) Utils.$("#expense-merchant").value = found.merchant;
      status.textContent =
        "Review the suggested details and correct anything that needs it.";
    } catch (e) {
      status.textContent = e.message;
    }
  });
  Utils.$("#monthly-budget-form").addEventListener("submit", (e) =>
    saveBudget(e, "monthly", "#monthly-budget-amount"),
  );
  Utils.$("#weekly-budget-form").addEventListener("submit", (e) =>
    saveBudget(e, "weekly", "#weekly-budget-amount"),
  );
  Utils.$("#category-budget-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const cat = Utils.$("#budget-category").value,
      amount = Utils.cents(Utils.$("#category-budget-amount").value),
      id = "category-" + cat;
    if (!amount) return;
    await DB.put("budgets", {
      id,
      amount,
      currency: App.settings.currency,
      period: "category",
      categoryId: cat,
    });
    Utils.$("#category-budget-amount").value = "";
    refresh();
  });
  Utils.$("#category-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = Utils.$("#category-name").value.trim();
    if (!name) return;
    await DB.put("categories", {
      id: Utils.uid(),
      name,
      icon: Utils.$("#category-icon").value || "•",
      color: "#7187cf",
      createdAt: new Date().toISOString(),
    });
    e.target.reset();
    Utils.$("#category-icon").value = "•";
    refresh();
    renderSettings();
  });
  Utils.$("#currency-select").addEventListener("change", (e) =>
    setSetting("currency", e.target.value),
  );
  Utils.$("#language-select").addEventListener("change", (e) =>
    setSetting("language", e.target.value),
  );
  Utils.$("#theme-select").addEventListener("change", (e) =>
    setSetting("theme", e.target.value),
  );
  Utils.$("#theme-toggle").addEventListener("click", () =>
    setSetting("theme", App.settings.theme === "light" ? "dark" : "light"),
  );
  Utils.$("#mobile-menu").addEventListener("click", () =>
    document.body.classList.toggle("menu-open"),
  );
  Utils.$("#export-csv").addEventListener("click", async () =>
    Utils.download(
      "spendwise-expenses.csv",
      new Blob([Reports.csv(App.expenses, App.categories)], {
        type: "text/csv;charset=utf-8",
      }),
    ),
  );
  Utils.$("#export-report").addEventListener("click", () =>
    Utils.download(
      `spendwise-report-${Utils.$("#report-month").value}.csv`,
      new Blob(
        [
          Reports.csv(
            Reports.inMonth(App.expenses, Utils.$("#report-month").value),
            App.categories,
          ),
        ],
        { type: "text/csv;charset=utf-8" },
      ),
    ),
  );
  const downloadRows = (name, rows) => Utils.download(name, new Blob([Reports.csv(rows, App.categories)], { type: "text/csv;charset=utf-8" }));
  Utils.$("#export-monthly").addEventListener("click", () => {
    const month = Utils.$("#report-month").value;
    downloadRows(`spendwise-month-${month}.csv`, Reports.inMonth(App.expenses, month));
  });
  Utils.$("#export-weekly").addEventListener("click", () => {
    const month = Utils.$("#report-month").value;
    const periods = App.reportMode === "monthly" ? Reports.fixedPeriods(month) : Reports.calendarPeriods(month);
    downloadRows(`spendwise-weeks-${month}.csv`, periods.flatMap((p) => App.expenses.filter((x) => x.date >= p.start && x.date <= p.end)));
  });
  Utils.$("#export-daily").addEventListener("click", () => {
    const date = Utils.$("#daily-date").value;
    downloadRows(`spendwise-day-${date}.csv`, App.expenses.filter((x) => x.date === date));
  });
  Utils.$("#export-json").addEventListener("click", exportBackup);
  Utils.$("#export-receipts").addEventListener("click", exportReceiptBundle);
  Utils.$("#restore-file").addEventListener("change", restoreBackup);
  Utils.$("#expense-dialog").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) e.currentTarget.close();
  });
  Utils.$("#close-receipts").addEventListener("click", () => Utils.$("#receipt-dialog").close());
  Utils.$("#receipt-dialog").addEventListener("close", () => {
    Utils.$$("#receipt-gallery img").forEach((img) => URL.revokeObjectURL(img.src));
    Utils.$("#receipt-gallery").innerHTML = "";
  });
  window.addEventListener("storage", () => refresh());
}
async function saveBudget(e, type, selector) {
  e.preventDefault();
  const amount = Utils.cents(Utils.$(selector).value);
  if (amount <= 0) return;
  await DB.put("budgets", {
    id: type,
    amount,
    currency: App.settings.currency,
    period: type,
    categoryId: null,
  });
  refresh();
  Utils.toast("Budget saved");
}
async function setSetting(key, value) {
  App.settings[key] = value;
  await DB.put("settings", { key, value });
  translate();
  applyTheme();
  refresh();
  if (App.currentView === "settings") renderSettings();
}
async function exportBackup() {
  const bundle = {
    format: "spendwise-backup",
    version: 1,
    exportedAt: new Date().toISOString(),
    expenses: App.expenses,
    receipts: await DB.all("receipts"),
    categories: App.categories,
    budgets: App.budgets,
    settings: await DB.all("settings"),
  };
  const json = await serializeBlobs(bundle);
  Utils.download(
    `spendwise-backup-${Utils.today()}.json`,
    new Blob([JSON.stringify(json)], { type: "application/json" }),
  );
}
async function serializeBlobs(bundle) {
  for (const r of bundle.receipts) r.imageBlob = await blobToData(r.imageBlob);
  return bundle;
}
function blobToData(blob) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });
}
function dataToBlob(data) {
  const [head, body] = data.split(",");
  const mime = head.match(/data:([^;]+)/)?.[1] || "image/jpeg",
    raw = atob(body),
    arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return new Blob([arr], { type: mime });
}
async function exportReceiptBundle() {
  const bundle = {
    expenses: App.expenses,
    categories: App.categories,
    receipts: await DB.all("receipts"),
  };
  await serializeBlobs(bundle);
  Utils.download(
    `spendwise-receipts-${Utils.today()}.json`,
    new Blob([JSON.stringify(bundle)], { type: "application/json" }),
  );
}
async function restoreBackup(e) {
  const file = e.target.files[0];
  e.target.value = "";
  if (!file) return;
  try {
    const x = JSON.parse(await file.text());
    if (
      x.format !== "spendwise-backup" ||
      x.version !== 1 ||
      !Array.isArray(x.expenses) ||
      !Array.isArray(x.categories) ||
      !Array.isArray(x.receipts) ||
      !Array.isArray(x.budgets)
    )
      throw new Error("This is not a valid Spendwise backup.");
    if (
      x.expenses.some(
        (r) =>
          !r.id ||
          !Number.isInteger(r.amount) ||
          !/^\d{4}-\d\d-\d\d$/.test(r.date),
      ) ||
      x.receipts.some((r) => !r.id || !r.imageBlob)
    )
      throw new Error(
        "Backup validation failed: a transaction or photo record is incomplete.",
      );
    const count = x.expenses.length;
    const ok = await Utils.confirmed(
      "Restore this backup?",
      `${count} expenses, ${x.receipts.length} receipt photos, categories and budgets will be added. Records with matching IDs will be updated.`,
      "Restore",
    );
    if (!ok) return;
    x.receipts = x.receipts.map((r) => ({
      ...r,
      imageBlob: dataToBlob(r.imageBlob),
    }));
    await DB.importBundle(x);
    await refresh();
    Utils.toast("Backup restored successfully");
  } catch (err) {
    Utils.toast(err.message || "Could not restore backup.", "error");
  }
}
function init() {
  const now = Utils.today(),
    month = Utils.monthKey(new Date());
  Utils.$("#today-label").textContent = Utils.fmtDate(now, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  Utils.$("#dash-month").value = month;
  Utils.$("#report-month").value = month;
  initEvents();
  if ("serviceWorker" in navigator && location.protocol.startsWith("http"))
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  DB.seed()
    .then(async () => {
      for (const key of ["currency", "language", "theme"]) {
        const s = await DB.get("settings", key);
        if (s) App.settings[key] = s.value;
      }
      translate();
      applyTheme();
      await refresh();
      App.initialized = true;
    })
    .catch((e) =>
      Utils.toast(e.message || "Could not open local database.", "error"),
    );
}
document.addEventListener("DOMContentLoaded", init);
