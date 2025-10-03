import { TabKey } from "../types/index.ts";

export default function Tabs({ labels }: { labels: Record<TabKey, string> }) {
  return (
    <nav
      class="sticky top-0 z-10 mb-6 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60
             dark:bg-neutral-900/70 dark:supports-[backdrop-filter]:bg-neutral-900/60
             border-b border-neutral-200 dark:border-neutral-800"
      aria-label="Portfolio sections"
    >
      <div class="mx-auto max-w-6xl px-4 overflow-x-auto scrollbar-none">
        <div
          class="flex items-center gap-2 py-3"
          role="tablist"
          aria-label="Portfolio sections"
        >
        </div>
      </div>
    </nav>
  );
}
