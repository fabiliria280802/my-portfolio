import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const username = Deno.env.get("GITHUB_USERNAME");
    if (!username) {
      return new Response("GITHUB_USERNAME no está definido", { status: 500 });
    }
    const { project } = ctx.params;
    const response = await fetch(`https://api.github.com/repos/${username}/${project}`);
    if (!response.ok) {
      return new Response("Error al obtener el repositorio", { status: 500 });
    }
    const repo = await response.json();
    return ctx.render({ repo });
  },
};

export default function ProjectDetail({ data }: PageProps<{ repo: any }>) {
  const { repo } = data;

  return (
    <div class="min-h-screen bg-background-light dark:bg-background-dark">
      <div class="container mx-auto px-4 py-8">
        <div class="max-w-4xl mx-auto bg-white dark:bg-background-dark shadow-xl rounded-lg p-8 animate-on-scroll">
          <h1 class="text-4xl font-bold mb-6 text-primary-light dark:text-primary-dark">{repo.name}</h1>
          
          {repo.description && (
            <p class="text-lg mb-6 text-text-light dark:text-text-dark">{repo.description}</p>
          )}

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="space-y-4">
              <h3 class="text-2xl font-semibold text-accent-light dark:text-accent-dark">Detalles</h3>
              <div class="space-y-2">
                <p class="flex items-center gap-2 text-text-light dark:text-text-dark">
                  <span class="font-medium">Lenguaje:</span>
                  <span class="bg-secondary-light/10 dark:bg-secondary-dark/10 px-3 py-1 rounded-full">
                    {repo.language || "No especificado"}
                  </span>
                </p>
                <p class="flex items-center gap-2 text-text-light dark:text-text-dark">
                  <span class="font-medium">Estrellas:</span>
                  <span>{repo.stargazers_count}</span>
                </p>
                <p class="flex items-center gap-2 text-text-light dark:text-text-dark">
                  <span class="font-medium">Forks:</span>
                  <span>{repo.forks_count}</span>
                </p>
              </div>
            </div>

            <div class="space-y-4">
              <h3 class="text-2xl font-semibold text-accent-light dark:text-accent-dark">Tecnologías</h3>
              {repo.topics && repo.topics.length > 0 ? (
                <ul class="flex flex-wrap gap-2">
                  {repo.topics.map((tech: string) => (
                    <li
                      key={tech}
                      class="bg-secondary-light/10 dark:bg-secondary-dark/10 
                             text-secondary-light dark:text-secondary-dark 
                             px-3 py-1 rounded-full text-sm font-medium
                             transition-colors duration-200
                             hover:bg-secondary-light/20 dark:hover:bg-secondary-dark/20"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              ) : (
                <p class="text-text-light dark:text-text-dark">No se especificaron tecnologías.</p>
              )}
            </div>
          </div>

          <div class="flex justify-between items-center">
            <a
              href="/projects"
              class="inline-flex items-center px-4 py-2 rounded-lg
                     bg-primary-light dark:bg-primary-dark
                     text-white transition-colors duration-200
                     hover:bg-accent-light dark:hover:bg-accent-dark"
            >
              ← Volver a proyectos
            </a>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-4 py-2 rounded-lg
                     bg-secondary-light dark:bg-secondary-dark
                     text-white transition-colors duration-200
                     hover:bg-accent-light dark:hover:bg-accent-dark"
            >
              Ver en GitHub →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}