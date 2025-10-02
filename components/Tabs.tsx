export type TabKey = "certificates" | "experiences" | "hackathons" | "projects" | "researchs" | "about" | "contact";

export default function Tabs({ labels }: { labels: Record<TabKey, string> }) {
    return (
        <div class="tabs">
            <div role="tablist" aria-label="Portfolio sections">
                {/* The interactive logic lives in TabsClient island */}
            </div>
        </div>
    );
}