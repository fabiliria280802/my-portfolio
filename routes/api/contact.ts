export const handler = {
  async POST(req: Request) {
    const { name, email, message, guard } = await req.json();

    // Simple anti-spam honeypot
    if (guard) return new Response(null, { status: 204 });

    if (!name || !email || !message) {
      return new Response("Bad Request", { status: 400 });
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) return new Response("Service Unavailable", { status: 503 });

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: Deno.env.get("MAIL_FROM"),
        to: [Deno.env.get("MAIL_TO")!],
        subject: `New portfolio message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!res.ok) return new Response("Email failed", { status: 502 });
    return new Response(null, { status: 204 });
  },
};
