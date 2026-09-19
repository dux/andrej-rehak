const root = new URL(".", import.meta.url).pathname;
const port = Number(process.env.PORT ?? 3000);

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".ico": "image/x-icon",
};

Bun.serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === "/") pathname = "/index.html";
    const rel = pathname.replace(/^\/+/, "");
    if (rel.includes("..")) return new Response("Odbijeno", { status: 400 });

    const file = Bun.file(root + rel);
    if (!(await file.exists())) return new Response("Nije nađeno", { status: 404 });

    const ext = rel.slice(rel.lastIndexOf("."));
    return new Response(file, {
      headers: { "Content-Type": MIME[ext] ?? "application/octet-stream" },
    });
  },
});

console.log(`Pitagora -> http://localhost:${port}`);
