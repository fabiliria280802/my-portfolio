import { Handlers, PageProps } from "$fresh/server.ts";
import ProjectsList from "../../islands/ProjectsList.tsx";
import type {  Repository } from "../../interfaces/Project.ts";
import 'dotenv/config';
import Navbar from "../../islands/Navbar.tsx";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const username = Deno.env.get("GITHUB_USERNAME");
    if (!username) {
      return new Response("GITHUB_USERNAME no está definido", { status: 500 });
    }
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
    <>
    <Navbar/>
    
    <div class="min-h-screen bg-background-light dark:bg-background-dark">
      <div class="container mx-auto px-4 py-8">
        <div class="max-w-7xl mx-auto">
          <h1 class="text-4xl font-bold mb-8 text-primary-light dark:text-primary-dark text-center">
            Mis Proyectos
          </h1>
          <ProjectsList repos={data.repos} />
        </div>
      </div>
    </div>
    </>

  );
}
