const Utils = (() => {
  const $ = (s, r = document) => r.querySelector(s),
    $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const pad = (n) => String(n).padStart(2, "0");
  const dateKey = (d) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const today = () => dateKey(new Date());
  const monthKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
  const parseDate = (s) => {
    const [y, m, d] = String(s).split("-").map(Number);
    return new Date(y, m - 1, d, 12);
  };
  const daysInMonth = (y, m) => new Date(y, m, 0).getDate();
  const addDays = (s, n) => {
    const d = parseDate(s);
    d.setDate(d.getDate() + n);
    return dateKey(d);
  };
  const cents = (n) => {
    const v = Number(n);
    if (!Number.isFinite(v)) return 0;
    return Math.round((v + Number.EPSILON) * 100);
  };
  const amount = (n) => (Number(n || 0) / 100).toFixed(2);
  const currency = (n, currencyCode = App?.settings?.currency || "MAD") => {
    try {
      return new Intl.NumberFormat(
        App?.settings?.language === "fr" ? "fr-FR" : "en-US",
        { style: "currency", currency: currencyCode, maximumFractionDigits: 2 },
      ).format(Number(n || 0) / 100);
    } catch {
      return `${amount(n)} ${currencyCode}`;
    }
  };
  const fmtDate = (
    s,
    opts = { month: "short", day: "numeric", year: "numeric" },
  ) =>
    parseDate(s).toLocaleDateString(
      App?.settings?.language === "fr" ? "fr-FR" : "en-US",
      opts,
    );
  const uid = () =>
    crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  const escapeHtml = (s) =>
    String(s ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const toast = (message, type = "success") => {
    const region = $("#toast-region");
    const el = document.createElement("div");
    el.className = `toast ${type}`;
    el.textContent = message;
    region.append(el);
    setTimeout(() => el.remove(), 3600);
  };
  const download = (name, blob) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  const csvCell = (x) => '"' + String(x ?? "").replaceAll('"', '""') + '"';
  const confirmed = (title, copy, action = "Delete") =>
    new Promise((resolve) => {
      const d = $("#confirm-dialog");
      $("#confirm-title").textContent = title;
      $("#confirm-copy").textContent = copy;
      $("#confirm-action").textContent = action;
      d.showModal();
      d.addEventListener("close", () => resolve(d.returnValue === "confirm"), {
        once: true,
      });
    });
  return {
    $,
    $$,
    pad,
    dateKey,
    today,
    monthKey,
    parseDate,
    daysInMonth,
    addDays,
    cents,
    amount,
    currency,
    fmtDate,
    uid,
    escapeHtml,
    toast,
    download,
    csvCell,
    confirmed,
  };
})();
