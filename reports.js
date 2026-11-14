const Reports = (() => {
  function inMonth(rows, month) {
    return rows.filter((x) => x.date.startsWith(month));
  }
  function sum(rows) {
    return rows.reduce((n, x) => n + x.amount, 0);
  }
  function groups(rows, key) {
    const out = new Map();
    for (const x of rows) {
      const k = key(x);
      out.set(k, (out.get(k) || 0) + x.amount);
    }
    return [...out.entries()]
      .map(([key, value]) => ({ key, value }))
      .sort((a, b) => b.value - a.value);
  }
  function fixedPeriods(month) {
    const [y, m] = month.split("-").map(Number),
      last = Utils.daysInMonth(y, m),
      periods = [];
    for (let i = 0; i < 5; i++) {
      const start = i * 7 + 1;
      if (start > last) break;
      const end = Math.min(start + 6, last);
      periods.push({
        label: `Week ${i + 1}`,
        start: `${month}-${String(start).padStart(2, "0")}`,
        end: `${month}-${String(end).padStart(2, "0")}`,
        days: end - start + 1,
      });
    }
    return periods;
  }
  function calendarPeriods(month) {
    const [y, m] = month.split("-").map(Number),
      first = Utils.dateKey(new Date(y, m - 1, 1)),
      last = Utils.dateKey(new Date(y, m, 0));
    let start = Utils.parseDate(first);
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
    const periods = [];
    while (Utils.dateKey(start) <= last) {
      const from = Utils.dateKey(start),
        end = new Date(start);
      end.setDate(end.getDate() + 6);
      const to = Utils.dateKey(end);
      const actualStart = from < first ? first : from,
        actualEnd = to > last ? last : to;
      periods.push({
        label: `${Utils.fmtDate(actualStart, { month: "short", day: "numeric" })} – ${Utils.fmtDate(actualEnd, { month: "short", day: "numeric" })}`,
        start: actualStart,
        end: actualEnd,
        days:
          Math.round(
            (Utils.parseDate(actualEnd) - Utils.parseDate(actualStart)) /
              86400000,
          ) + 1,
      });
      start.setDate(start.getDate() + 7);
    }
    return periods;
  }
  function periodStats(rows, p) {
    const found = rows.filter((x) => x.date >= p.start && x.date <= p.end),
      vals = found.map((x) => x.amount);
    return {
      ...p,
      expenses: found,
      total: sum(found),
      count: found.length,
      average: found.length ? Math.round(sum(found) / p.days) : 0,
      highest: vals.length ? Math.max(...vals) : 0,
      lowest: vals.length ? Math.min(...vals) : 0,
      categories: groups(found, (x) => x.categoryId),
    };
  }
  function day(rows, date) {
    const list = rows.filter((x) => x.date === date);
    return {
      date,
      expenses: list,
      total: sum(list),
      count: list.length,
      categories: groups(list, (x) => x.categoryId),
      payments: groups(list, (x) => x.paymentMethod),
    };
  }
  function dailySeries(rows, month) {
    const [y, m] = month.split("-").map(Number),
      n = Utils.daysInMonth(y, m),
      out = [];
    for (let d = 1; d <= n; d++) {
      const date = `${month}-${String(d).padStart(2, "0")}`;
      out.push({ date, total: sum(rows.filter((x) => x.date === date)) });
    }
    return out;
  }
  function monthlySeries(rows, month) {
    const [y, m] = month.split("-").map(Number),
      out = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(y, m - 1 - i, 1),
        key = Utils.monthKey(d);
      out.push({ month: key, total: sum(inMonth(rows, key)) });
    }
    return out;
  }
  function csv(rows, categories) {
    const names = new Map(categories.map((c) => [c.id, c.name]));
    const headers = [
      "Date",
      "Amount",
      "Currency",
      "Category",
      "Payment method",
      "Merchant",
      "Description",
    ];
    return [
      headers,
      ...rows.map((x) => [
        x.date,
        Utils.amount(x.amount),
        x.currency,
        names.get(x.categoryId) || "Unknown",
        x.paymentMethod,
        x.merchant,
        x.description,
      ]),
    ]
      .map((r) => r.map(Utils.csvCell).join(","))
      .join("\r\n");
  }
  return {
    sum,
    groups,
    fixedPeriods,
    calendarPeriods,
    periodStats,
    day,
    dailySeries,
    monthlySeries,
    csv,
    inMonth,
  };
})();
