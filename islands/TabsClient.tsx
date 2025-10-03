import { useEffect, useRef, useState } from "preact/hooks";
import { TabKey, TabsClientProps } from "../types/index.ts";

const KEYS = [
  "certificates",
  "experiences",
  "hackathons",
  "projects",
  "researchs",
  "about",
  "contact",
] as const;

export default function TabsClient({
  initialActive = "about",
  labels,
  panelIds = {
    certificates: "panel-certificates",
    experiences: "panel-experiences",
    hackathons: "panel-hackathons",
    projects: "panel-projects",
    researchs: "panel-researchs",
    about: "panel-about",
    contact: "panel-contact",
  },
}: TabsClientProps) {
  const [active, setActive] = useState<TabKey>(initialActive);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Mostrar/ocultar paneles del DOM (IDs)
  useEffect(() => {
    for (const k of KEYS) {
      const id = panelIds[k];
      if (!id) continue;
      const el = document.getElementById(id);
      if (!el) continue;
      if (k === active) {
        el.removeAttribute("hidden");
        el.setAttribute("tabIndex", "0"); // panel activo focalizable
      } else {
        el.setAttribute("hidden", "");
        el.removeAttribute("tabIndex");
      }
    }
    tabRefs.current[active]?.focus();
  }, [active]);

  function onKeyDown(e: KeyboardEvent) {
    const idx = KEYS.indexOf(active);
    if (e.key === "ArrowRight") setActive(KEYS[(idx + 1) % KEYS.length]);
    else if (e.key === "ArrowLeft") {
      setActive(KEYS[(idx - 1 + KEYS.length) % KEYS.length]);
    } else if (e.key === "Home") setActive(KEYS[0]);
    else if (e.key === "End") setActive(KEYS[KEYS.length - 1]);
  }

  return (
    <div class="mx-auto max-w-6xl px-4 -mt-[3.25rem] pt-[3.25rem]">
      <div
        role="tablist"
        aria-label="Portfolio sections"
        onKeyDown={(e) => onKeyDown(e as any)}
        class="flex items-center gap-2 py-3"
      >
        {KEYS.map((k) => {
          const selected = active === k;
          return (
            <button
              key={k}
              ref={(el) => {
                tabRefs.current[k] = el;
              }}
              role="tab"
              aria-selected={selected}
              aria-controls={panelIds[k] ?? ""}
              id={`tab-${k}`}
              onClick={() => setActive(k)}
              class={[
                "shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition",
                "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900",
                selected
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow"
                  : "bg-white text-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800",
              ].join(" ")}
            >
              {labels[k]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
