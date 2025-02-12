import { useState, useEffect } from 'preact/hooks';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleThemeChange = () => {
      const savedTheme = localStorage.getItem('theme');
      setIsDarkMode(savedTheme === 'dark');
    };

    globalThis.addEventListener('themeChange', handleThemeChange);

    return () => {
      globalThis.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  return (
    <footer className={`w-full text-center py-4 transition-theme ${isDarkMode ? 'bg-background-dark     text-text-dark' : 'bg-background text-text'}`}>
      <p>© {currentYear}. FABIANA LIRIA SOTO. TODOS LOS DERECHOS RESERVADOS</p>
    </footer>
  );
};

export default Footer;
