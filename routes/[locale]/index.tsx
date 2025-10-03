// routes/[locale]/index.tsx
console.log("[route:/[locale]] module loaded");

import Tabs from "../../components/Tabs.tsx";
import TabsClient from "../../islands/TabsClient.tsx";
import ProjectsList from "../../islands/ProjectsList.tsx";
import ContactForm from "../../islands/ContactForm.tsx";

import {
  loadUIStrings,
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
} from "../../utils/i18n.ts";

import SectionShell from "../../components/SectionShell.tsx";
import ResearchCarousel from "../../islands/ResearchCarousel.tsx";
import ExperiencesTimeline from "../../islands/ExperiencesTimeline.tsx";
import HackathonsShowcase from "../../islands/HackathonsShowcase.tsx";
import CertificatesFlipGrid from "../../islands/CertificatesFlipGrid.tsx";
import { loadContent } from "../../utils/content.ts";
import AboutMeTerminal from "../../islands/AboutMeTerminal.tsx";
import { PageProps } from "fresh";

export default async function LocalizedHome(ctx: PageProps) {
  const stateLocale = (ctx.state as { locale?: string })?.locale;
  const paramLocale = ctx.params?.locale;

  // DEBUG: params y state
  console.log("[route] params.locale:", paramLocale, " state.locale:", stateLocale);
  console.log("[route] SUPPORTED_LOCALES:", SUPPORTED_LOCALES);

  const chosen =
    (stateLocale ?? paramLocale) && SUPPORTED_LOCALES.includes(stateLocale ?? paramLocale!)
      ? (stateLocale ?? paramLocale)!
      : DEFAULT_LOCALE;

  console.log("[route] chosen locale:", chosen);

  const t = loadUIStrings(chosen);

  // carga de secciones
  const keys = ["about", "certificates", "experiences", "hackathons", "projects", "researchs"];
  console.log("[route] will load content keys:", keys);

  const [about, certs, exps, hacks, projs, researchs] = await Promise.all([
    loadContent(chosen, "about"),
    loadContent(chosen, "certificates"),
    loadContent(chosen, "experiences"),
    loadContent(chosen, "hackathons"),
    loadContent(chosen, "projects"),
    loadContent(chosen, "researchs"),
  ]);

  console.log("[route] loaded content summary:", {
    about: !!about,
    certificates: !!certs,
    experiences: !!exps,
    hackathons: !!hacks,
    projects: !!projs,
    researchs: !!researchs,
  });

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

      <SectionShell title={t["projects"]}>
        <ProjectsList locale={chosen} />
      </SectionShell>

      <SectionShell title={t["about"]}>
        <AboutMeTerminal locale={chosen} />
      </SectionShell>

      <SectionShell title={t["certificates"]}>
        <CertificatesFlipGrid locale={chosen} />
      </SectionShell>

      <SectionShell title={t["experiences"]}>
        <ExperiencesTimeline locale={chosen} />
      </SectionShell>

      <SectionShell title={t["hackathons"]}>
        <HackathonsShowcase locale={chosen} />
      </SectionShell>

      <SectionShell title={t["researchs"]}>
        <ResearchCarousel locale={chosen} />
      </SectionShell>

      <SectionShell title={t["contact"]}>
        <ContactForm locale={chosen} />
      </SectionShell>
    </main>
  );
}

