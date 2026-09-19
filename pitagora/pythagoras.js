(function (root, factory) {
  const api = factory();
  root.Pythagoras = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const MAX_N = 1_000_000_000;

  function gcd(a, b) {
    while (b) { const t = a % b; a = b; b = t; }
    return a;
  }

  function isqrt(n) {
    if (n < 0) return -1;
    let r = Math.floor(Math.sqrt(n));
    while ((r + 1) * (r + 1) <= n) r++;
    while (r * r > n) r--;
    return r;
  }

  function factorize(n) {
    const f = [];
    let d = 2;
    while (d * d <= n) {
      if (n % d === 0) {
        let e = 0;
        while (n % d === 0) { n /= d; e++; }
        f.push([d, e]);
      }
      d += d === 2 ? 1 : 2;
    }
    if (n > 1) f.push([n, 1]);
    return f;
  }

  function divisors(n) {
    let divs = [1];
    for (const [p, e] of factorize(n)) {
      const next = [];
      let pe = 1;
      for (let i = 0; i <= e; i++) {
        for (const d of divs) next.push(d * pe);
        pe *= p;
      }
      divs = next;
    }
    return divs.sort((x, y) => x - y);
  }

  function formatInt(n) {
    return n.toLocaleString("hr-HR");
  }

  function formatFactors(n) {
    const f = factorize(n);
    if (!f.length) return String(n);
    return f.map(([p, e]) => e === 1 ? p : `${p}^${e}`).join(" · ");
  }

  function primeFactors1mod4(n) {
    return factorize(n).filter(([p]) => p % 4 === 1).map(([p]) => p);
  }

  function dedupeTriples(list) {
    const seen = new Set();
    const out = [];
    for (const t of list) {
      const key = `${t.a},${t.b},${t.c}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(t);
    }
    return out.sort((x, y) => x.a - y.a || x.b - y.b);
  }

  // sve (a, b) sa a^2 + b^2 = N^2; Euklid: N = k(m^2 + n^2)
  function solveHypotenuse(N) {
    const out = [];
    for (const d of divisors(N)) {
      if (d < 5) continue;
      const mMax = isqrt(d - 1);
      for (let m = Math.floor(Math.sqrt(d / 2)) + 1; m <= mMax; m++) {
        const n2 = d - m * m;
        const n = isqrt(n2);
        if (n <= 0 || n >= m || n * n !== n2) continue;
        if (gcd(m, n) !== 1 || ((m - n) & 1) !== 1) continue;
        const k = N / d;
        const a = k * (m * m - n * n);
        const b = 2 * k * m * n;
        out.push({ a: Math.min(a, b), b: Math.max(a, b), c: N, m, n, k });
      }
    }
    return dedupeTriples(out);
  }

  // sve trojke sa a + b + c = N; Euklid: N = 2k * m * (m + n)
  function solvePerimeter(N) {
    if (N % 2 !== 0) return [];
    const half = N / 2;
    const out = [];
    for (const d of divisors(half)) {
      if (d < 6) continue;
      for (const m of divisors(d)) {
        if (m < 2) continue;
        const j = d / m;
        if (j >= 2 * m) continue;
        const n = j - m;
        if (n <= 0 || n >= m) continue;
        if (gcd(m, n) !== 1 || ((m - n) & 1) !== 1) continue;
        const k = half / d;
        const a = k * (m * m - n * n);
        const b = 2 * k * m * n;
        const c = k * (m * m + n * n);
        out.push({ a: Math.min(a, b), b: Math.max(a, b), c, m, n, k });
      }
    }
    return dedupeTriples(out);
  }

  return { MAX_N, gcd, isqrt, factorize, divisors, formatInt, formatFactors, primeFactors1mod4, solveHypotenuse, solvePerimeter };
});
