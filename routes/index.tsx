import { h } from 'preact';
import i18next from '../i18n.ts';

export default async function Home() {
  const welcomeMessage = i18next.t('welcome_message');
  const contact = i18next.t('contact');

  return (
    <div>
      <h1>{welcomeMessage}</h1>
      <a href="/contact">{contact}</a>
    </div>
  );
}

