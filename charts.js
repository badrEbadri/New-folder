const Charts = (() => {
  const instances = {};
  let libraryLoading = false;
  let libraryFailed = false;
  let lastRender = null;
  const colors = [
    "#5c7cfa",
    "#f59e62",
    "#51a88a",
    "#d8799b",
    "#a177d3",
    "#e0b550",
    "#58a9c0",
    "#e2785d",
    "#8d9ab0",
    "#82bc78",
  ];
  function destroy() {
    for (const c of Object.values(instances)) c?.destroy();
    for (const k of Object.keys(instances)) delete instances[k];
  }
  function fallback(canvas, labels, data) {
    const el = canvas.parentElement.querySelector(".chart-fallback");
    el.hidden = false;
    canvas.hidden = true;
    const max = Math.max(1, ...data);
    el.innerHTML = labels
      .map(
        (l, i) =>
          `<div class="fallback-row"><span>${Utils.escapeHtml(l)}</span><div><i style="width:${Math.max(2, (data[i] / max) * 100)}%;background:${colors[i % colors.length]}"></i></div><strong>${Utils.currency(data[i])}</strong></div>`,
      )
      .join("");
  }
  function draw(id, type, labels, data, opts = {}) {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    const fb = canvas.parentElement.querySelector(".chart-fallback");
    fb.hidden = true;
    canvas.hidden = false;
    if (!window.Chart) {
      fallback(canvas, labels, data);
      return;
    }
    const muted = getComputedStyle(document.documentElement).getPropertyValue("--muted").trim() || "#818a9d";
    const line = getComputedStyle(document.documentElement).getPropertyValue("--line").trim() || "#e9edf4";
    instances[id]?.destroy();
    instances[id] = new Chart(canvas, {
      type,
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: labels.map((_, i) => colors[i % colors.length]),
            borderColor: type === "line" ? "#5c7cfa" : undefined,
            borderWidth: type === "doughnut" ? 0 : 2,
            fill: type === "line" ? true : undefined,
            tension: 0.35,
            pointRadius: type === "line" ? 2 : undefined,
            borderRadius: type === "bar" ? 6 : undefined,
            hoverOffset: type === "doughnut" ? 5 : undefined,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: type === "doughnut",
            position: "bottom",
            labels: {
              usePointStyle: true,
              boxWidth: 7,
              padding: 16,
              color: muted,
            },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${Utils.currency(ctx.raw)}`,
            },
          },
        },
        scales:
          type === "doughnut"
            ? {}
            : {
                x: {
                  grid: { display: false },
                  ticks: {
                    color: muted,
                    maxRotation: 0,
                    autoSkip: true,
                  },
                },
                y: {
                  beginAtZero: true,
                  grid: { color: line },
                  ticks: {
                    color: muted,
                    callback: (v) =>
                      new Intl.NumberFormat(undefined, {
                        notation: "compact",
                      }).format(v / 100),
                  },
                },
              },
        ...opts,
      },
    });
  }
  function render(rows, month, cats) {
    lastRender = { rows, month, cats };
    const data = Reports.dailySeries(rows, month);
    draw(
      "daily-chart",
      "bar",
      data.map((x) => Number(x.date.slice(8))),
      data.map((x) => x.total),
    );
    const categoryTotals = Reports.groups(
      Reports.inMonth(rows, month),
      (x) => x.categoryId,
    );
    draw(
      "category-chart",
      "doughnut",
      categoryTotals.map(
        (g) => cats.find((c) => c.id === g.key)?.name || "Other",
      ),
      categoryTotals.map((g) => g.value),
    );
    const weekTotals = Reports.fixedPeriods(month).map((p) =>
      Reports.periodStats(rows, p),
    );
    draw(
      "weekly-chart",
      "bar",
      weekTotals.map((x) => x.label),
      weekTotals.map((x) => x.total),
    );
    const payments = Reports.groups(
      Reports.inMonth(rows, month),
      (x) => x.paymentMethod,
    );
    draw(
      "payment-chart",
      "doughnut",
      payments.map((x) => x.key),
      payments.map((x) => x.value),
    );
    const monthly = Reports.monthlySeries(rows, month);
    const labels = monthly.map((x) => Utils.parseDate(`${x.month}-01`).toLocaleDateString(App.settings.language === "fr" ? "fr-FR" : "en-US", { month: "short" }));
    draw("monthly-chart", "line", labels, monthly.map((x) => x.total));
    const averages = monthly.map((x) => Math.round(x.total / Utils.daysInMonth(...x.month.split("-").map(Number))));
    draw("average-chart", "line", labels, averages);
    if (!window.Chart && !libraryLoading && !libraryFailed && navigator.onLine) {
      libraryLoading = true;
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";
      script.onload = () => { libraryLoading = false; if (lastRender) render(lastRender.rows, lastRender.month, lastRender.cats); };
      script.onerror = () => { libraryLoading = false; libraryFailed = true; };
      document.head.append(script);
    }
  }
  return { render, destroy };
})();
