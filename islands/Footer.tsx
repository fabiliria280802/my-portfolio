import { useState, useEffect } from "preact/hooks";
import i18next from "../i18n.ts";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [t, setT] = useState(() => i18next.t.bind(i18next));
  const [language, setLanguage] = useState(i18next.language);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleThemeChange = () => {
      const savedTheme = localStorage.getItem("theme");
      setIsDarkMode(savedTheme === "dark");
    };

    globalThis.addEventListener("themeChange", handleThemeChange);

    return () => {
      globalThis.removeEventListener("themeChange", handleThemeChange);
    };
  }, []);

  useEffect(() => {
    const handleLanguageChange = () => {
      setT(() => i18next.t.bind(i18next));
      setLanguage(i18next.language);
    };

    i18next.on("languageChanged", handleLanguageChange);

    return () => {
      i18next.off("languageChanged", handleLanguageChange);
    };
  }, []);

  return (
    <footer
      className={`w-full text-center py-4 transition-theme ${
        isDarkMode
          ? "bg-background-dark     text-text-dark"
          : "bg-background text-text"
      }`}
    >
      <p>© {currentYear}. FABIANA LIRIA SOTO. TODOS LOS DERECHOS RESERVADOS</p>
    </footer>
  );
};

export default Footer;
