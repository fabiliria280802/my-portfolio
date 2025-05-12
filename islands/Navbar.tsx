import { useEffect, useState } from 'preact/hooks';
import i18next from '../i18n.ts';

const Navbar = () => {
  const [t, setT] = useState(() => i18next.t.bind(i18next));
  const [language, setLanguage] = useState(i18next.language);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(savedTheme === 'dark' || (!savedTheme && prefersDark));
  }, []);


  useEffect(() => {
    const handleLanguageChange = () => {
      setT(() => i18next.t.bind(i18next));
      setLanguage(i18next.language);
    };

    i18next.on('languageChanged', handleLanguageChange);

    return () => {
      i18next.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const toggleTheme = () => {
    if (typeof window !== 'undefined') {
      const newTheme = isDarkMode ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
     console.log("Tema almacenado:", localStorage.getItem('theme'));
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      setIsDarkMode(!isDarkMode);
      globalThis.dispatchEvent(new Event('themeChange'));
    } else {
      console.log("localStorage no está disponible.");
    }
  };
  
  const handleChangeLanguage = (lng: string) => {
    i18next.changeLanguage(lng);
  };

  const navLinks = [
    { href: '/about', label: 'about' },
    { href: '/projects', label: 'projects' },
    { href: '/contact', label: 'contact' },
    { href: '/researchs', label: 'researchs' },
    { href: '/certifications', label: 'certifications' },
    { href: '/experiences', label: 'experiences' },
    { href: '/hackathons', label: 'hackathons' },
  ];

  return (
    <nav class={`fixed w-full top-0 z-50 transition-theme ${isDarkMode ? 'bg-background-dark text-text-dark' : 'bg-background-light text-text-light'}`}>
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="hidden md:flex space-x-8">
              <img
                src="/logo.svg"
                width="30"
                height="28"
                alt="the Fresh logo: a sliced lemon dripping with juice"
              />
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  class={`px-3 py-2 rounded-md text-sm font-medium transition-theme relative group ${
                    isDarkMode 
                      ? 'text-text-dark hover:text-primary-dark' 
                      : 'text-text hover:text-primary'
                  }`}
                >
                  {t(link.label)}
                  <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </a>
              ))}
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <select
              value={language}
              onChange={(e) => handleChangeLanguage((e.target as HTMLSelectElement).value)}
              class={`border rounded-lg transition-theme ${
                isDarkMode 
                  ? 'bg-background-dark border-gray-700 text-text-dark' 
                  : 'bg-background border-gray-300 text-text'
              }`}
            >
              <option value="en">English</option>
              <option value="es">Español</option>

                  <option value="fr">Français</option>
              <option value="pt">Português</option>
              <option value="de">Deutsch</option>
              <option value="fi">Suomi</option>


            </select>

            <button
              onClick={toggleTheme}
              class={`p-2 rounded-md transition-theme ${
                isDarkMode 
                  ? 'text-yellow-400 hover:bg-gray-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                  />
                </svg>
              ) : (
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
                  />
                </svg>
              )}
            </button>

            <a
              href="/login"
              class={`border border-blue-500 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-500 hover:text-white ${
                isDarkMode ? 'text-white' : 'text-gray-600'
              }`}
            >
              Login
            </a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              class={`md:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200 ${
                isDarkMode 
                  ? 'text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span class="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg class="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg class="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

      </div>

      <div class={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div class={`px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t ${
          isDarkMode 
            ? 'bg-gray-900 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              class={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              {t(link.label)}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;