import { useEffect, useRef, useState } from "preact/hooks";


const KEYS = ["certificates","experiences","hackathons","projects","researchs","about","contact"] as const;

export default function TabsClient() {
    const [active, setActive] = useState<(typeof KEYS)[number]>("projects");
    const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

    function onKeyDown(e: KeyboardEvent) {
        const idx = KEYS.indexOf(active);
        if (e.key === "ArrowRight") setActive(KEYS[(idx + 1) % KEYS.length]);
        if (e.key === "ArrowLeft") setActive(KEYS[(idx - 1 + KEYS.length) % KEYS.length]);
    }

    useEffect(() => {
        tabRefs.current[active]?.focus();
    }, [active]);

    return (
        <div>
            <div role="tablist" class="tablist" onKeyDown={(e) => onKeyDown(e as any)}>
                {KEYS.map((k) => (
                    <button
                        ref={(el) => { tabRefs.current[k] = el; }}
                        role="tab"
                        aria-selected={active === k}
                        aria-controls={`panel-${k}`}
                        onClick={() => setActive(k)}
                    >{k}</button>
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