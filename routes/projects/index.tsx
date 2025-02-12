import { Handlers, PageProps } from "$fresh/server.ts";
import ProjectCard from "../../components/ProjectCard.tsx";
import Repository from "../../interfaces/Project.ts"

export const handler: Handlers = {
  async GET(_req, ctx) {
    const username = "TU_USUARIO_GITHUB"; 
    const response = await fetch(`https://api.github.com/users/${username}/repos`);

    if (!response.ok) {
      return new Response("Error al obtener los repositorios", { status: 500 });
    }

    const repos: Repository[] = await response.json();

    return ctx.render({ repos });
  },
};

export default function ProjectsPage({ data }: PageProps<{ repos: Repository[] }>) {
  return (
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold mb-6">Mis Proyectos</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.repos.map((repo) => (
          <ProjectCard key={repo.name} repo={repo} />
        ))}
      </div>
    </div>
  );
}
