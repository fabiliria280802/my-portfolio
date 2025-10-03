import { define } from "../utils.ts";

const SUPPORTED = new Set(["en", "es"]);
const isStatic = (p: string) =>
  p.includes(".") || p.startsWith("/_fresh") || p.startsWith("/assets") ||
  p.startsWith("/favicon");

export default define.middleware(async (ctx) => {
  const url = new URL(ctx.req.url);
  const { pathname } = url;
  const first = pathname.split("/")[1];

  // DEBUG: request entrante
  console.log("[mw] req:", pathname);

  if (isStatic(pathname) || pathname.startsWith("/api")) {
    console.log("[mw] static/api passthrough");
    return await ctx.next();
  }

  if (SUPPORTED.has(first)) {
    (ctx.state as { locale?: string }).locale = first;
    console.log("[mw] locale in path ->", first, " passthrough");
    return await ctx.next();
  }

  // si no trae locale, redirige (elige tu default real, ej 'en')
  const to = `/en${pathname}`;
  console.log("[mw] redirect ->", to);
  url.pathname = to;
  return Response.redirect(url);
});
