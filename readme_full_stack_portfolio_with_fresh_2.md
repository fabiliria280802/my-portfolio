# Full‑Stack Portfolio – Fresh 2.0 (Deno + Islands + i18n)

A multilingual portfolio website for a Full‑Stack Developer built with **Fresh
2.0** on **Deno**, using **Islands architecture**. It presents content in
**tabbed sections**:

- **Certificates**
- **Experiences**
- **Hackathons**
- **Projects** (fetched from GitHub)
- **Researchs** (research)
- **About me**
- **Contact me** (email form)

This README explains setup, structure, i18n, data loading, GitHub integration,
the contact form, deployment, and CI/CD.

---

## 1) Tech Stack

- **Framework:** [Fresh 2.x] (Preact + Deno HTTP server)
- **Language:** TypeScript
- **Rendering:** SSR + Islands (interactive components on top)
- **Styling:** your choice (Twind/UnoCSS/Tailwind via PostCSS). Examples below
  stay CSS‑agnostic.
- **State & Data:** Deno KV
- **Email:** Resend / AWS SES / SMTP (choose one)
- **i18n:** URL‑based locales + JSON dictionaries

---

## 2) Prerequisites

- **Deno** ≥ 1.44 installed (`deno --version`)
- A **GitHub** account & (optional) **token** if you want to fetch
  private/starred repos reliably.
- An email provider key (e.g. **RESEND_API_KEY**) or SMTP credentials.

---

## 3) Quick Start

```bash
# Create a Fresh app (no git, no VSCode settings)
deno run -A -r https://fresh.deno.dev my-portfolio
cd my-portfolio

# Add tasks & imports (see deno.json and import_map.json snippets below)

# Run dev server
deno task dev
# Open http://localhost:8000
```

**Recommended repo name:** `portfolio-fresh`.

---

## 4) Project Structure (suggested)

```
my-portfolio/
  │  deno.json
  │  import_map.json
  │  .env.example
  │  README.md
  ├─ components/
  │    Tabs.tsx                  # Server component: markup for tablist
  │    SectionShell.tsx          # Common layout for each tab section
  ├─ islands/
  │    TabsClient.tsx            # Client island: tab switching, keyboard a11y
  │    LanguageSwitcher.tsx      # Client island: language change
  │    ContactForm.tsx           # Client island: form submission & UX
  │    ProjectsList.tsx          # Client island: hydrate GitHub projects
  ├─ routes/
  │  │  index.tsx                # Home (tabs)
  │  │  _app.tsx                 # Root layout (sets lang, meta)
  │  │  _middleware.ts           # i18n & locale detection
  │  ├─ api/
  │  │    github-projects.ts     # Server endpoint that fetches GitHub repos
  │  │    contact.ts             # Server endpoint to send mail
  │  └─ (certificates|experiences|hackathons|researchs|about)/index.tsx
  ├─ data/
  │  ├─ en/
  │  │    about.json
  │  │    certificates.json
  │  │    experiences.json
  │  │    hackathons.json
  │  │    researchs.json
  │  ├─ es/
  │  │    about.json
  │  │    certificates.json
  │  │    experiences.json
  │  │    hackathons.json
  │  │    researchs.json
  │  └─ i18n/
  │       en.json                # UI strings
  │       es.json
  ├─ utils/
  │    i18n.ts
  │    github.ts
  │    kv.ts
  └─ static/                     # assets (favicons, images, cv.pdf, etc.)
```

> **Note:** You can keep each tab as a single **page section** on `/`
> (recommended for speed), or expose sub‑routes for deep‑links (e.g.
> `/en/experiences`). This README shows both options.

---

## 5) Internationalization (i18n)

### 5.1 Locale strategy

- **URL prefix:** `/{locale}/...` (e.g., `/en`, `/es`). Default fallback locale
  set in middleware.
- **Dictionaries:** JSON files in `data/i18n` for UI strings. Content tabs also
  live per‑locale in `data/{locale}/...`.

### 5.2 Middleware for locale

**`routes/_middleware.ts`** (simplified):

```ts
import { MiddlewareHandlerContext } from "$fresh/server.ts";

const SUPPORTED = ["en", "es"] as const;
const DEFAULT_LOCALE = "en";

export async function handler(req: Request, ctx: MiddlewareHandlerContext) {
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
```

### 5.3 i18n helper

**`utils/i18n.ts`**

```ts
export type UIStrings = Record<string, string>;

export async function loadUIStrings(locale: string): Promise<UIStrings> {
  const mod = await import(`../data/i18n/${locale}.json`, {
    assert: { type: "json" },
  });
  return mod.default as UIStrings;
}

export async function loadContent<T = unknown>(
  locale: string,
  file: string,
): Promise<T> {
  const mod = await import(`../data/${locale}/${file}.json`, {
    assert: { type: "json" },
  });
  return mod.default as T;
}
```

### 5.4 Language switcher island

**`islands/LanguageSwitcher.tsx`**

```tsx
import { useEffect, useState } from "preact/hooks";

export default function LanguageSwitcher() {
  const [loc, setLoc] = useState("en");
  useEffect(() => {
    const current = location.pathname.split("/")[1] || "en";
    setLoc(current);
  }, []);

  function changeLocale(next: string) {
    const parts = location.pathname.split("/");
    parts[1] = next; // swap locale segment
    location.assign(parts.join("/"));
  }

  return (
    <select
      value={loc}
      onChange={(e) => changeLocale((e.target as HTMLSelectElement).value)}
      aria-label="Language"
    >
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  );
}
```

---

## 6) Tabs UI (Islands)

### 6.1 Markup + island hydration

**`components/Tabs.tsx`** (SSR)

```tsx
export type TabKey =
  | "certificates"
  | "experiences"
  | "hackathons"
  | "projects"
  | "researchs"
  | "about"
  | "contact";

export default function Tabs({ labels }: { labels: Record<TabKey, string> }) {
  return (
    <div class="tabs">
      <div role="tablist" aria-label="Portfolio sections">
        {/* The interactive logic lives in TabsClient island */}
      </div>
    </div>
  );
}
```

**`islands/TabsClient.tsx`** (client)

```tsx
import { useEffect, useRef, useState } from "preact/hooks";

const KEYS = [
  "certificates",
  "experiences",
  "hackathons",
  "projects",
  "researchs",
  "about",
  "contact",
] as const;

export default function TabsClient() {
  const [active, setActive] = useState<(typeof KEYS)[number]>("projects");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  function onKeyDown(e: KeyboardEvent) {
    const idx = KEYS.indexOf(active);
    if (e.key === "ArrowRight") setActive(KEYS[(idx + 1) % KEYS.length]);
    if (e.key === "ArrowLeft") {
      setActive(KEYS[(idx - 1 + KEYS.length) % KEYS.length]);
    }
  }

  useEffect(() => {
    tabRefs.current[active]?.focus();
  }, [active]);

  return (
    <div>
      <div
        role="tablist"
        class="tablist"
        onKeyDown={(e) => onKeyDown(e as any)}
      >
        {KEYS.map((k) => (
          <button
            ref={(el) => (tabRefs.current[k] = el)}
            role="tab"
            aria-selected={active === k}
            aria-controls={`panel-${k}`}
            onClick={() => setActive(k)}
          >
            {k}
          </button>
        ))}
      </div>

      {KEYS.map((k) => (
        <section id={`panel-${k}`} role="tabpanel" hidden={active !== k}>
          <slot name={k}></slot>
        </section>
      ))}
    </div>
  );
}
```

### 6.2 Using tabs on Home

**`routes/index.tsx`** (redirects to default locale)

```ts
import { Handlers } from "$fresh/server.ts";
export const handler: Handlers = {
  GET(req) {
    const url = new URL(req.url);
    url.pathname = "/en"; // or detect
    return Response.redirect(url, 308);
  },
};
```

**`routes/[locale]/index.tsx`** (SSR + islands)

```tsx
import Tabs from "../../components/Tabs.tsx";
import TabsClient from "../../islands/TabsClient.tsx";
import ProjectsList from "../../islands/ProjectsList.tsx";
import ContactForm from "../../islands/ContactForm.tsx";
import { loadContent, loadUIStrings } from "../../utils/i18n.ts";

export default async function Home(req: Request, ctx: any) {
  const { locale } = ctx.state;
  const t = await loadUIStrings(locale);
  const [about, certs, exps, hacks, researchs] = await Promise.all([
    loadContent(locale, "about"),
    loadContent(locale, "certificates"),
    loadContent(locale, "experiences"),
    loadContent(locale, "hackathons"),
    loadContent(locale, "researchs"),
  ]);

  return (
    <main>
      <Tabs
        labels={{
          certificates: t["certificates"],
          experiences: t["experiences"],
          hackathons: t["hackathons"],
          projects: t["projects"],
          researchs: t["researchs"],
          about: t["about"],
          contact: t["contact"],
        }}
      />

      <TabsClient />

      {/* Panels via slots convention (simplified) */}
      <section slot="projects">
        <ProjectsList locale={locale} />
      </section>
      <section slot="about">
        <article dangerouslySetInnerHTML={{ __html: about.html }} />
      </section>
      <section slot="certificates">{/* render certs */}</section>
      <section slot="experiences">{/* render exps */}</section>
      <section slot="hackathons">{/* render hacks */}</section>
      <section slot="researchs">{/* render researchs */}</section>
      <section slot="contact">
        <ContactForm locale={locale} />
      </section>
    </main>
  );
}
```

> You can replace the `slot` pattern with props or context—use any island
> composition you prefer.

---

## 7) GitHub Projects (API + KV cache)

### 7.1 Env variables

Create `.env` (see `.env.example`):

```
GITHUB_USERNAME=your_github_user
GITHUB_TOKEN=ghp_... # optional, improves rate limits
```

### 7.2 Server util

**`utils/github.ts`**

```ts
export type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  topics?: string[];
};

export async function fetchRepos(
  user: string,
  token?: string,
): Promise<Repo[]> {
  const headers: HeadersInit = { "Accept": "application/vnd.github+json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(
    `https://api.github.com/users/${user}/repos?per_page=100&sort=updated`,
    { headers },
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = await res.json();
  return data as Repo[];
}
```

### 7.3 API route with cache (KV optional)

**`utils/kv.ts`**

```ts
export const kv = ("Deno" in globalThis && (Deno as any).openKv)
  ? await (Deno as any).openKv()
  : undefined;
```

**`routes/api/github-projects.ts`**

```ts
import { fetchRepos } from "../../utils/github.ts";
import { kv } from "../../utils/kv.ts";

export const handler = {
  async GET(_req: Request) {
    const user = Deno.env.get("GITHUB_USERNAME")!;
    const token = Deno.env.get("GITHUB_TOKEN");

    const key = ["gh", user];
    if (kv) {
      const cached = await kv.get(key);
      if (cached.value) {
        return new Response(JSON.stringify(cached.value), {
          headers: { "content-type": "application/json" },
        });
      }
    }

    const repos = await fetchRepos(user, token);
    // Example filter: exclude forks/archived, pick languages, etc.
    const filtered = repos.filter((r: any) => !r.fork && !r.archived);

    if (kv) await kv.set(key, filtered, { expireIn: 1000 * 60 * 15 }); // 15 min

    return new Response(JSON.stringify(filtered), {
      headers: { "content-type": "application/json" },
    });
  },
};
```

### 7.4 Island to render projects

**`islands/ProjectsList.tsx`**

```tsx
import { useEffect, useState } from "preact/hooks";

export default function ProjectsList({ locale }: { locale: string }) {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/github-projects`).then((r) => r.json()).then(setRepos).finally(
      () => setLoading(false),
    );
  }, []);

  if (loading) return <p>Loading…</p>;

  return (
    <ul class="grid">
      {repos.map((r) => (
        <li>
          <a href={r.html_url} target="_blank" rel="noreferrer">{r.name}</a>
          {r.description && <p>{r.description}</p>}
          <small>{r.language} • ⭐ {r.stargazers_count}</small>
        </li>
      ))}
    </ul>
  );
}
```

---

## 8) Contact Form (emails)

### 8.1 Env variables

```
MAIL_FROM="Portfolio <no-reply@yourdomain.com>"
MAIL_TO="yourname@domain.com"
RESEND_API_KEY=re_...
# Or SMTP_* / AWS_* if using SMTP or SES
```

### 8.2 API route (Resend example)

**`routes/api/contact.ts`**

```ts
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
```

### 8.3 Contact form island

**`islands/ContactForm.tsx`**

```tsx
import { useState } from "preact/hooks";

export default function ContactForm({ locale }: { locale: string }) {
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: Event) {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const payload = Object.fromEntries(fd.entries());
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    });
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
```

> Replace Resend with SES/SMTP by calling their APIs/servers inside the same
> route.

---

## 9) Data Files per Locale

Example `data/es/experiences.json`:

```json
[
  {
    "role": "Software Specialist",
    "company": "Deuna App",
    "from": "2023-06",
    "to": "present",
    "summary": "Desarrollo de apps nativas de Zendesk y microservicios Node/Nest, integraciones ADA/Qualtrics, etc."
  }
]
```

Use similar JSON for `certificates`, `hackathons`, `researchs`, and `about` (can
be HTML/markdown processed server‑side).

---

## 10) Root Layout & SEO

**`routes/_app.tsx`**

```tsx
export default function App({ Component, state }: any) {
  const locale = state.locale ?? "en";
  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Full‑Stack Portfolio</title>
        <meta name="description" content="Full‑Stack developer portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Full‑Stack Portfolio" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
```

Add `/robots.txt` and `/sitemap.xml` in `routes/` as needed.

---

## 11) Deno tasks & Config

**`deno.json`** (example)

```json
{
  "tasks": {
    "dev": "deno run -A --env --watch main.ts",
    "fmt": "deno fmt",
    "lint": "deno lint",
    "test": "deno test -A"
  },
  "fmt": { "useTabs": false, "lineWidth": 100 },
  "lint": { "rules": { "tags": ["fresh", "recommended"] } }
}
```

**`import_map.json`** (example)

```json
{
  "imports": {
    "$fresh/": "https://deno.land/x/fresh@2.0.0/",
    "preact": "https://esm.sh/preact@10.20.2",
    "preact/hooks": "https://esm.sh/preact@10.20.2/hooks"
  }
}
```

> Keep versions aligned with your Fresh scaffold.

---

## 12) Environment Variables

Create `.env` based on example:

```
# GitHub
GITHUB_USERNAME=
GITHUB_TOKEN=
# Mail
RESEND_API_KEY=
MAIL_FROM=
MAIL_TO=
# i18n
DEFAULT_LOCALE=en
```

Load with `--env` as shown in tasks.

---

## 13) Testing

- **Unit tests:** `deno test` for utilities and server handlers.
- **Accessibility:** Use `axe` (in browser) and keyboard‑only navigation for the
  tabs.
- **Visual:** Consider Playwright for E2E (Fresh runs great under it).

---

## 14) Deployment

### Option A: Deno Deploy

- Link repo → Deno Deploy → set environment variables.
- KV: enable Deno KV if using caching.

### Option B: Self‑host (Deno on VM/container)

- `deno run -A --env main.ts`
- Use a reverse proxy (Nginx/Caddy) for TLS & caching.

---

## 15) CI/CD (GitHub Actions example)

`.github/workflows/ci.yml`

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: denoland/setup-deno@v2
        with: { deno-version: v1.x }
      - run: deno fmt --check
      - run: deno lint
      - run: deno test -A
```

> For Deno Deploy integration, add a deploy job using `deployctl` or Deno Deploy
> GitHub app.

---

## 16) Content Workflow

- Update `data/{locale}/*.json` for each language.
- Keep `data/i18n/{locale}.json` for UI strings in sync.
- Add images to `static/` and reference with absolute `/img/...` paths.

---

## 17) Accessibility & UX Notes

- Tabs must be keyboard navigable (Arrow keys, Home/End) and use proper ARIA
  roles.
- Provide focus styles, sufficient color contrast, and skip links.
- Forms: label all inputs, show errors inline, and confirm submission.

---

## 18) Roadmap (optional)

- Markdown support for content with server‑side rendering.
- Search across content.
- Dark mode toggle (island).
- Tags/filters for Projects (topics, language).
- RSS feed for research & blog posts.

---

## 19) License

MIT (or your preferred license).
