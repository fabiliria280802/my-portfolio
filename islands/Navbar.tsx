import { useEffect, useState } from 'preact/hooks';
import i18next from '../i18n.ts';

const Navbar = () => {
  const [t, setT] = useState(() => i18next.t.bind(i18next));
  const [language, setLanguage] = useState(i18next.language);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <nav class="bg-white shadow-lg fixed w-full top-0 z-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="hidden md:flex space-x-8">
            <img
                src="/logo.svg"
                width="30"
                height="28"
                alt="the Fresh logo: a sliced lemon dripping    with juice"
              />
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group"
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
              class="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200 hover:border-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="pt">Português</option>
              <option value="de">Deutsch</option>
              <option value="fi">Suomi</option>
            </select>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
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
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              class="text-gray-600 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
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
