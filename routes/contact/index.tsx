import ContactForm from "../../islands/ContactForm.tsx";
import Navbar from "../../islands/Navbar.tsx";

export default function ContactPage() {
  return (
    <>
    <Navbar />
    <div class="min-h-screen flex flex-col justify-center items-center bg-background text-text dark:bg-background-dark dark:text-text-dark px-4 py-12">
      <div class="max-w-2xl w-full text-center mb-8">
        <h1 class="text-4xl font-bold mb-4">Contáctame</h1>
        <p class="text-lg opacity-80">
          ¿Tienes una idea o proyecto? ¡Estoy lista para ayudarte!
        </p>
      </div>

      <div class="w-full max-w-xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg transition-theme">
        <ContactForm />
      </div>
    </div>
    </>
    
  );
}