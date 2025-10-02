import { useState } from "preact/hooks";

export default function ContactForm({ locale }: { locale: string }) {
    const [ok, setOk] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    async function onSubmit(e: Event) {
        e.preventDefault();
        const fd = new FormData(e.target as HTMLFormElement);
        const payload = Object.fromEntries(fd.entries());
        const res = await fetch("/api/contact", { method: "POST", body: JSON.stringify(payload) });
        setOk(res.ok || res.status === 204);
        if (!res.ok) setErr("Failed to send");
    }

    return (
        <form onSubmit={onSubmit}>
            <input name="name" placeholder="Your name" required />
            <input name="email" type="email" placeholder="you@email.com" required />
            <textarea name="message" placeholder="Message" required />
            <input name="guard" class="hidden" tabIndex={-1} autoComplete="off" />
            <button type="submit">Send</button>
            {ok && <p>Thanks! I will reply soon.</p>}
            {err && <p role="alert">{err}</p>}
        </form>
    );
}