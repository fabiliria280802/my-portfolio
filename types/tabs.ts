// /types/tabs.ts
export type TabKey =
  | "certificates"
  | "experiences"
  | "hackathons"
  | "projects"
  | "researchs"
  | "about"
  | "contact";

export type TabLabels = Record<TabKey, string>;

export type PanelIds = Partial<Record<TabKey, string>>;

export interface TabsClientProps {
  initialActive?: TabKey;
  labels: TabLabels;
  panelIds?: PanelIds;
}
