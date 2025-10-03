import Tabs from "../components/Tabs.tsx";
import TabsClient from "../islands/TabsClient.tsx";

import ProjectsList from "../islands/ProjectsList.tsx";
import ContactForm from "../islands/ContactForm.tsx";
import SectionShell from "../components/SectionShell.tsx";
import ResearchCarousel from "../islands/ResearchCarousel.tsx";
import ExperiencesTimeline from "../islands/ExperiencesTimeline.tsx";
import HackathonsShowcase from "../islands/HackathonsShowcase.tsx";
import CertificatesFlipGrid from "../islands/CertificatesFlipGrid.tsx";
import AboutMeTerminal from "../islands/AboutMeTerminal.tsx";

import {
  DEFAULT_LOCALE,
  loadUIStrings,
  SUPPORTED_LOCALES,
} from "../utils/i18n.ts";
import { loadContent } from "../utils/content.ts";
import { PageProps } from "fresh";

// Si quieres detectar Accept-Language aquí para "/" sin pasar por middleware,
// podrías añadir una pequeña función getPreferredLocale(req)

export default async function Root(_ctx: PageProps) {
  // Elegimos un locale válido; para "/" usa el default
  const chosen = DEFAULT_LOCALE;

  // i18n
  const t = loadUIStrings(chosen);

  // Contenido (ya SSR, sin fetch en cliente)
  const [about, certs, exps, hacks, researchs] = await Promise.all([
    loadContent(chosen, "about"),
    loadContent(chosen, "certificates"),
    loadContent(chosen, "experiences"),
    loadContent(chosen, "hackathons"),
    loadContent(chosen, "researchs"),
  ]);

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
