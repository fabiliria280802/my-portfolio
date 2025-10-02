

const SUPPORTED = ["en", "es"] as const;
const DEFAULT_LOCALE = "en";

export async function handler(req: Request, ctx: FreshContext) {
    const url = new URL(req.url);
    const seg0 = url.pathname.split("/")[1];
    const locale = SUPPORTED.includes(seg0 as any) ? seg0 : DEFAULT_LOCALE;

    // Normalize root to include locale
    if (url.pathname === "/") {
        url.pathname = `/${DEFAULT_LOCALE}`;
        return Response.redirect(url, 308);
    }

    // Attach locale to state
    ctx.state.locale = locale;
    return await ctx.next();
}