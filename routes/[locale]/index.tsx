console.log("[route:/[locale]] module loaded");

import Tabs from "../../components/Tabs.tsx";
import TabsClient from "../../islands/TabsClient.tsx";

import ProjectsList from "../../islands/ProjectsList.tsx";
import ContactForm from "../../islands/ContactForm.tsx";
import SectionShell from "../../components/SectionShell.tsx";
import ResearchCarousel from "../../islands/ResearchCarousel.tsx";
import ExperiencesTimeline from "../../islands/ExperiencesTimeline.tsx";
import HackathonsShowcase from "../../islands/HackathonsShowcase.tsx";
import CertificatesFlipGrid from "../../islands/CertificatesFlipGrid.tsx";
import AboutMeTerminal from "../../islands/AboutMeTerminal.tsx";

import {
  DEFAULT_LOCALE,
  loadUIStrings,
  SUPPORTED_LOCALES,
} from "../../utils/i18n.ts";
import { loadContent } from "../../utils/content.ts";
import { PageProps } from "fresh";

export default async function LocalizedHome(ctx: PageProps) {
  const stateLocale = (ctx.state as { locale?: string })?.locale;
  const paramLocale = ctx.params?.locale;

  console.log(
    "[route] params.locale:",
    paramLocale,
    " state.locale:",
    stateLocale,
  );
  console.log("[route] SUPPORTED_LOCALES:", SUPPORTED_LOCALES);

  const chosen = (stateLocale ?? paramLocale) &&
      SUPPORTED_LOCALES.includes(stateLocale ?? paramLocale!)
    ? (stateLocale ?? paramLocale)!
    : DEFAULT_LOCALE;

  console.log("[route] chosen locale:", chosen);

  const t = loadUIStrings(chosen);

  const keys = [
    "about",
    "certificates",
    "experiences",
    "hackathons",
    "projects",
    "researchs",
  ];
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

  const labels = {
    certificates: t["certificates"] ?? "Certificates",
    experiences: t["experiences"] ?? "Experiences",
    hackathons: t["hackathons"] ?? "Hackathons",
    projects: t["projects"] ?? "Projects",
    researchs: t["researchs"] ?? "Research",
    about: t["about"] ?? "About",
    contact: t["contact"] ?? "Contact",
  };

  return (
    <main class="container mx-auto px-4 py-8">
      <Tabs labels={labels} />
      <TabsClient initialActive="about" labels={labels} />
      <SectionShell title={labels.projects}>
        <section
          id="panel-projects"
          role="tabpanel"
          hidden
          aria-labelledby="tab-projects"
        >
          <ProjectsList locale={chosen} />
        </section>
      </SectionShell>
      <SectionShell title={labels.about}>
        <section id="panel-about" role="tabpanel" aria-labelledby="tab-about">
          <AboutMeTerminal locale={chosen} initialData={about as any} />
        </section>
      </SectionShell>
      <SectionShell title={labels.certificates}>
        <section
          id="panel-certificates"
          role="tabpanel"
          hidden
          aria-labelledby="tab-certificates"
        >
          <CertificatesFlipGrid locale={chosen} />
        </section>
      </SectionShell>
      <SectionShell title={labels.experiences}>
        <section
          id="panel-experiences"
          role="tabpanel"
          hidden
          aria-labelledby="tab-experiences"
        >
          <ExperiencesTimeline locale={chosen} />
        </section>
      </SectionShell>
      <SectionShell title={labels.hackathons}>
        <section
          id="panel-hackathons"
          role="tabpanel"
          hidden
          aria-labelledby="tab-hackathons"
        >
          <HackathonsShowcase locale={chosen} />
        </section>
      </SectionShell>
      <SectionShell title={labels.researchs}>
        <section
          id="panel-researchs"
          role="tabpanel"
          hidden
          aria-labelledby="tab-researchs"
        >
          <ResearchCarousel locale={chosen} />
        </section>
      </SectionShell>
      <SectionShell title={labels.contact}>
        <section
          id="panel-contact"
          role="tabpanel"
          hidden
          aria-labelledby="tab-contact"
        >
          <ContactForm locale={chosen} />
        </section>
      </SectionShell>
    </main>
  );
}
