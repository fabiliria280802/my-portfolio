"use client";

import { useState } from "preact/hooks";
import ProjectCard from "../components/ProjectCard.tsx";
import { ProjectsListProps } from "../interfaces/Project.ts";

export default function ProjectsList({ repos }: ProjectsListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (repo.description?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (repo.topics || []).some(topic => 
      topic.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div class="space-y-6">
      <div class="max-w-2xl mx-auto">
        <div class="relative">
          <input
            type="text"
            placeholder="Buscar por nombre, descripción o tecnología..."
            class="w-full px-4 py-3 rounded-lg
                   bg-background-light dark:bg-background-dark
                   text-text-light dark:text-text-dark
                   border-2 border-secondary-light/20 dark:border-secondary-dark/20
                   focus:border-primary-light dark:focus:border-primary-dark
                   focus:outline-none
                   transition-colors duration-200"
            value={searchTerm}
            onInput={(e: any) => setSearchTerm(e.currentTarget.value)}
          />
          <div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-light dark:text-secondary-dark">
            🔍
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRepos.map((repo) => (
          <a
            href={`/projects/${repo.name}`}
            key={repo.name}
            class="transform transition-transform duration-300 hover:scale-102"
          >
            <ProjectCard repo={repo} />
          </a>
        ))}
      </div>

      {filteredRepos.length === 0 && (
        <div class="text-center py-12">
          <p class="text-xl text-text-light dark:text-text-dark">
            No se encontraron proyectos que coincidan con tu búsqueda.
          </p>
        </div>
      )}
    </div>
  );
}