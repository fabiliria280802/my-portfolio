import { define } from "../utils.ts";
import Tabs from "../components/Tabs.tsx";
import TabsClient from "../islands/TabsClient.tsx";
import ProjectsList from "../islands/ProjectsList.tsx";
import ContactForm from "../islands/ContactForm.tsx";
import LanguageSwitcher from "../islands/LanguageSwitcher.tsx";
import ResearchCarousel from "../islands/ResearchCarousel.tsx";
import CertificatesFlipGrid from "../islands/CertificatesFlipGrid.tsx";
import HackathonsShowcase from "../islands/HackathonsShowcase.tsx";
import ExperiencesTimeline from "../islands/ExperiencesTimeline.tsx";
import AboutMeTerminal from "../islands/AboutMeTerminal.tsx";

const labels = {
  certificates: "Certificates",
  experiences: "Experiences",
  hackathons: "Hackathons",
  projects: "Projects",
  researchs: "Research",
  about: "About",
  contact: "Contact",
};

export default define.page(function Home(ctx) {

  console.log("Shared value " + ctx.state.shared);

  return (
    <main class="px-4 py-8 mx-auto fresh-gradient min-h-screen">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Fresh Portfolio</h1>
        <LanguageSwitcher />
        <Tabs labels={labels} />
        <TabsClient />
        <section slot="projects"><ProjectsList locale="en" /></section>
        <section slot="about"><AboutMeTerminal locale="en" /></section>
        <section slot="certificates"><CertificatesFlipGrid locale="en" /></section>
        <section slot="experiences"><ExperiencesTimeline locale="en" /></section>
        <section slot="hackathons"><HackathonsShowcase locale="en" /></section>
        <section slot="researchs"><ResearchCarousel locale="en" /></section>
        <section slot="contact"><ContactForm locale="en" /></section>
      </div>
    </main>
  );
});
