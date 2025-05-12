import { useState } from "preact/hooks";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setError("Por favor, completa todos los campos.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor, introduce un correo electrónico válido.");
      return;
    }
    if (message.length < 10) {
        setError("El mensaje debe tener al menos 10 caracteres.");
        return;
    }
    if (message.length > 500) {
        setError("El mensaje no puede tener más de 500 caracteres.");
        return;
    }
    if (name.length < 3) {
        setError("El nombre debe tener al menos 3 caracteres.");
        return;
    }
    if (name.length > 50) {
        setError("El nombre no puede tener más de 50 caracteres.");
        return;
    }
    if (email.length > 100) {
        setError("El correo electrónico no puede tener más de 100 caracteres.");
        return;
    }
    console.log({ name, email, message });

    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} class="space-y-6">
      {submitted && (
        <div class="text-green-600 font-medium text-center">
          ¡Mensaje enviado con éxito!
        </div>
      )}

      {error && (
        <div class="text-red-500 text-sm text-center">
          {error}
        </div>
      )}

      <div>
        <label class="block text-sm font-medium mb-1" htmlFor="name">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          class="w-full p-3 border rounded-lg bg-background text-text dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onInput={(e) => setName((e.target as HTMLInputElement).value)}
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1" htmlFor="email">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          class="w-full p-3 border rounded-lg bg-background text-text dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1" htmlFor="message">
          Mensaje
        </label>
        <textarea
          id="message"
          class="w-full p-3 border rounded-lg h-32 resize-none bg-background text-text dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={message}
          onInput={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
        />
      </div>

      <button
        type="submit"
        class="w-full py-3 px-6 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200"
      >
        Enviar mensaje
      </button>
    </form>
  );
}
