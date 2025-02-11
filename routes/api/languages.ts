import { Handlers } from "$fresh/server.ts";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  // Agrega más idiomas según sea necesario
];

export const handler: Handlers = {
  GET(_req) {
    return new Response(JSON.stringify(languages), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
