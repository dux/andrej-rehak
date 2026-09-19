const {
  MAX_N, formatInt, formatFactors, primeFactors1mod4, solveHypotenuse, solvePerimeter,
} = Pythagoras;

const COLORS = { a: "#38bdf8", b: "#f59e0b", c: "#a78bfa" };

const els = {
  hyp: { panel: document.getElementById("panel-hyp"), result: document.getElementById("result-hyp"), wrap: document.getElementById("canvaswrap-hyp"), canvas: document.getElementById("canvas-hyp"), input: document.getElementById("input-hyp") },
  sum: { panel: document.getElementById("panel-sum"), result: document.getElementById("result-sum"), wrap: document.getElementById("canvaswrap-sum"), canvas: document.getElementById("canvas-sum"), input: document.getElementById("input-sum") },
};

const state = { hyp: null, sum: null };

function readInput(input) {
  const raw = input.value.trim();
  if (!raw) throw new Error("Upiši broj.");
  const n = Number(raw);
  if (!Number.isFinite(n) || !Number.isInteger(n)) throw new Error("Broj mora biti cijeli.");
  if (n < 1) throw new Error("Broj mora biti veći od 0.");
  if (n > MAX_N) throw new Error(`Za ovaj preglednik ograničenje je ${formatInt(MAX_N)}.`);
  return n;
}

function verdict(kind, title, body) {
  const cls = kind === "yes" ? "yes" : "no";
  const label = kind === "yes" ? "Da" : "Ne";
  return `<div class="verdict ${cls}"><span class="pill">${label}</span><div class="body"><h2>${title}</h2><p>${body}</p></div></div>`;
}

function tripleChips(list) {
  return `<div class="triples">${list.map(t =>
    `<span class="triple"><span class="a">${formatInt(t.a)}</span><span class="sep">,</span>` +
    `<span class="b">${formatInt(t.b)}</span><span class="sep">,</span>` +
    `<span class="c">${formatInt(t.c)}</span>` +
    (t.k > 1 ? `<span class="k">×${t.k}</span>` : "") + `</span>`).join("")}</div>`;
}

function runHypotenuse() {
  const N = readInput(els.hyp.input);
  const list = solveHypotenuse(N);
  state.hyp = list;
  els.hyp.wrap.hidden = true;

  if (!list.length) {
    const primes = primeFactors1mod4(N);
    const why = primes.length
      ? "Nijedan par kateta ne daje točno taj kvadrat hipotenuze."
      : "Nijedan prosti faktor nije oblika 4k+1, pa se broj ne može napisati kao zbroj dva kvadrata.";
    els.hyp.result.innerHTML = verdict("no", `${formatInt(N)} nije hipotenuza`,
      `N = ${formatFactors(N)}. ${why}`);
    return;
  }

  els.hyp.result.innerHTML =
    verdict("yes", `${formatInt(N)} je hipotenuza`, `Broj trojki: <code>${list.length}</code> · N = ${formatFactors(N)}`) +
    tripleChips(list);

  els.hyp.wrap.hidden = false;
  renderTriangles(els.hyp.canvas, list, { mode: "hyp" });
}

function runPerimeter() {
  const N = readInput(els.sum.input);
  const list = solvePerimeter(N);
  state.sum = list;
  els.sum.wrap.hidden = true;

  if (!list.length) {
    const why = N % 2 !== 0
      ? "Zbroj stranica svake Pitagorine trojke je paran (a + b + c = 2k·m·(m+n)), pa neparan broj ne može biti zbroj."
      : (N < 12
        ? "Najmanji mogući zbroj je 3 + 4 + 5 = 12."
        : `Nijedna Pitagorina trojka nema zbroj stranica ${formatInt(N)}.`);
    els.sum.result.innerHTML = verdict("no", `${formatInt(N)} se ne razlaže`, why);
    return;
  }

  els.sum.result.innerHTML =
    verdict("yes", `${formatInt(N)} se razlaže`, `Pronađeno trojki: <code>${list.length}</code>`) +
    `<div class="section-title">Razlaganje na tri stranice</div>` +
    `<div class="triples">${list.map(t =>
      `<span class="triple"><span class="a">${formatInt(t.a)}</span><span class="sep">+</span>` +
      `<span class="b">${formatInt(t.b)}</span><span class="sep">+</span>` +
      `<span class="c">${formatInt(t.c)}</span><span class="sep">=</span>` +
      `${formatInt(t.a + t.b + t.c)}</span>`).join("")}</div>`;

  els.sum.wrap.hidden = false;
  renderTriangles(els.sum.canvas, list, { mode: "sum" });
}

/* ---------- canvas ---------- */

let rafId = null;

function renderTriangles(canvas, solutions, options) {
  cancelAnimationFrame(rafId);
  const t0 = performance.now();
  const frame = (t) => {
    const p = Math.min(1, (t - t0) / 480);
    drawAll(canvas, solutions, options, p);
    if (p < 1) rafId = requestAnimationFrame(frame);
  };
  rafId = requestAnimationFrame(frame);
}

function drawAll(canvas, solutions, options, p) {
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const wrap = canvas.parentElement;
  const cssW = wrap.clientWidth || 320;
  const gap = 18;
  const minCell = 320;
  const cols = Math.max(1, Math.floor((cssW + gap) / (minCell + gap)));
  const cellW = (cssW - gap * (cols - 1)) / cols;
  const cellH = Math.max(250, Math.min(360, cellW * 0.92));
  const rows = Math.ceil(solutions.length / cols);
  const cssH = rows * cellH + (rows - 1) * gap;

  canvas.width = Math.round(cssW * dpr);
  canvas.height = Math.round(cssH * dpr);
  canvas.style.width = "100%";
  canvas.style.height = cssH + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);
  ctx.textBaseline = "middle";

  solutions.forEach((sol, i) => {
    const r = Math.floor(i / cols);
    const c = i % cols;
    const x = c * (cellW + gap);
    const y = r * (cellH + gap);
    const local = Math.max(0, Math.min(1, p * 1.6 - i * 0.08));
    const alpha = easeOut(local);
    ctx.globalAlpha = alpha;
    drawCard(ctx, x, y, cellW, cellH, sol, options, alpha);
  });
  ctx.globalAlpha = 1;
}

function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function drawCard(ctx, x, y, w, h, sol, options, alpha) {
  ctx.fillStyle = "rgba(255,255,255,0.035)";
  ctx.strokeStyle = "rgba(255,255,255,0.09)";
  ctx.lineWidth = 1;
  roundRect(ctx, x + 0.5, y + 0.5, w - 1, h - 1, 16);
  ctx.fill();
  ctx.stroke();

  const pad = 16;
  const headerH = 52;
  const barH = options.mode === "sum" ? 46 : 0;
  ctx.textAlign = "left";
  ctx.font = "700 15px ui-monospace, Menlo, monospace";
  ctx.fillStyle = "#e7ecf5";
  ctx.fillText(`${sol.a} · ${sol.b} · ${sol.c}`, x + pad, y + pad + 10);

  ctx.font = "12px ui-monospace, Menlo, monospace";
  ctx.fillStyle = "#7f8db0";
  ctx.fillText(`(m,n)=(${sol.m},${sol.n})${sol.k > 1 ? `  ×${sol.k}` : ""}`, x + pad, y + pad + 30);

  const areaX = x + pad;
  const areaY = y + pad + headerH;
  const areaW = w - pad * 2;
  const areaH = h - pad * 2 - headerH - barH;
  drawTriangle(ctx, areaX, areaY, areaW, areaH, sol, alpha);

  if (options.mode === "sum") {
    drawSumBar(ctx, areaX, y + h - pad - 20, areaW, sol);
  }
}

function drawTriangle(ctx, ax, ay, aw, ah, sol, alpha) {
  const { a, b } = sol;
  const scale = Math.min((aw * 0.66) / a, (ah * 0.7) / b);
  const bw = a * scale;
  const bh = b * scale;
  const x0 = ax + (aw - bw) / 2;
  const y0 = ay + (ah + bh) / 2;

  const A = { x: x0, y: y0 };
  const B = { x: x0 + bw, y: y0 };
  const C = { x: x0, y: y0 - bh };

  const grad = ctx.createLinearGradient(x0, y0 - bh, x0 + bw, y0);
  grad.addColorStop(0, "rgba(167,139,250,0.30)");
  grad.addColorStop(1, "rgba(56,189,248,0.18)");

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.moveTo(A.x, A.y);
  ctx.lineTo(B.x, B.y);
  ctx.lineTo(C.x, C.y);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();

  ctx.lineWidth = 3;
  ctx.lineCap = "round";

  ctx.strokeStyle = COLORS.a;
  line(ctx, A.x, A.y, B.x, B.y);
  ctx.strokeStyle = COLORS.b;
  line(ctx, A.x, A.y, C.x, C.y);
  ctx.strokeStyle = COLORS.c;
  line(ctx, B.x, B.y, C.x, C.y);

  const q = Math.min(16, Math.max(10, Math.min(bw, bh) * 0.16));
  ctx.strokeStyle = "rgba(231,236,245,0.75)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(A.x + q, A.y);
  ctx.lineTo(A.x + q, A.y - q);
  ctx.lineTo(A.x, A.y - q);
  ctx.stroke();

  ctx.font = "700 13px ui-monospace, Menlo, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillStyle = COLORS.a;
  ctx.fillText(`a=${sol.a}`, (A.x + B.x) / 2, A.y + Math.min(20, bh * 0.18 + 12));

  ctx.fillStyle = COLORS.b;
  ctx.save();
  ctx.translate(C.x - 16, (A.y + C.y) / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(`b=${sol.b}`, 0, 0);
  ctx.restore();

  ctx.fillStyle = COLORS.c;
  const dx = B.x - C.x;
  const dy = B.y - C.y;
  const len = Math.hypot(dx, dy) || 1;
  const hx = (B.x + C.x) / 2;
  const hy = (B.y + C.y) / 2;
  const ax2 = hx - A.x;
  const ay2 = hy - A.y;
  const nx = -dy / len;
  const ny = dx / len;
  const sgn = (nx * ax2 + ny * ay2) >= 0 ? -1 : 1;
  ctx.fillText(`c=${sol.c}`, hx + sgn * nx * 22, hy + sgn * ny * 22);
}

function line(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function drawSumBar(ctx, x, y, w, sol) {
  const total = sol.a + sol.b + sol.c;
  const h = 12;
  const gap = 3;
  const usable = w - gap * 2;
  const segs = [
    { v: sol.a, color: COLORS.a },
    { v: sol.b, color: COLORS.b },
    { v: sol.c, color: COLORS.c },
  ];
  let cx = x;
  ctx.save();
  ctx.font = "700 11px ui-monospace, Menlo, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  segs.forEach((s, idx) => {
    const sw = (s.v / total) * usable;
    ctx.fillStyle = s.color;
    roundRect(ctx, cx, y, Math.max(2, sw), h, idx === 0 || idx === 2 ? 6 : 3);
    ctx.fill();
    if (sw > 26) {
      ctx.fillStyle = "rgba(11,16,32,0.85)";
      ctx.fillText(String(s.v), cx + sw / 2, y + h / 2 + 0.5);
    }
    cx += sw + gap;
  });
  ctx.restore();
}

/* ---------- wiring ---------- */

function selectTab(name) {
  for (const key of ["hyp", "sum"]) {
    const active = key === name;
    els[key].panel.classList.toggle("active", active);
    const tab = document.querySelector(`.tab[data-tab="${key}"]`);
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  }
  requestAnimationFrame(() => {
    if (name === "hyp" && state.hyp && !els.hyp.wrap.hidden) renderTriangles(els.hyp.canvas, state.hyp, { mode: "hyp" });
    if (name === "sum" && state.sum && !els.sum.wrap.hidden) renderTriangles(els.sum.canvas, state.sum, { mode: "sum" });
  });
}

document.querySelectorAll(".tab").forEach(t =>
  t.addEventListener("click", () => selectTab(t.dataset.tab)));

document.querySelectorAll(".examples button").forEach(b =>
  b.addEventListener("click", () => {
    const tab = b.dataset.tab;
    els[tab].input.value = b.dataset.example;
    selectTab(tab);
    (tab === "hyp" ? runHypotenuse : runPerimeter)();
  }));

document.getElementById("form-hyp").addEventListener("submit", e => {
  e.preventDefault();
  try { runHypotenuse(); } catch (err) {
    els.hyp.result.innerHTML = `<div class="error">${err.message}</div>`;
    els.hyp.wrap.hidden = true;
  }
});

document.getElementById("form-sum").addEventListener("submit", e => {
  e.preventDefault();
  try { runPerimeter(); } catch (err) {
    els.sum.result.innerHTML = `<div class="error">${err.message}</div>`;
    els.sum.wrap.hidden = true;
  }
});

let resizeTimer = null;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (state.hyp && !els.hyp.wrap.hidden) renderTriangles(els.hyp.canvas, state.hyp, { mode: "hyp" });
    if (state.sum && !els.sum.wrap.hidden) renderTriangles(els.sum.canvas, state.sum, { mode: "sum" });
  }, 140);
});

runHypotenuse();
runPerimeter();
selectTab("hyp");
