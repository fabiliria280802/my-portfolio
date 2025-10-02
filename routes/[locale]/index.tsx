import Tabs from "../../components/Tabs";
import TabsClient from "../../islands/TabsClient";
import ProjectsList from "../../islands/ProjectsList";
import ContactForm from "../../islands/ContactForm";
import { loadUIStrings, loadContent } from "../../utils/i18n";

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

    // @ts-ignore
    return (
        <main>
            <Tabs labels={{
                certificates: t["certificates"],
                experiences: t["experiences"],
                hackathons: t["hackathons"],
                projects: t["projects"],
                researchs: t["researchs"],
                about: t["about"],
                contact: t["contact"],
            }} />

            <TabsClient />

            {/* Panels via slots convention (simplified) */}
            <section slot="projects"><ProjectsList locale={locale} /></section>
            <section slot="about"><article dangerouslySetInnerHTML={{ __html: about.html }} /></section>
            <section slot="certificates">{/* render certs */}</section>
            <section slot="experiences">{/* render exps */}</section>
            <section slot="hackathons">{/* render hacks */}</section>
            <section slot="researchs">{/* render researchs */}</section>
            <section slot="contact"><ContactForm locale={locale} /></section>
        </main>
    );
}