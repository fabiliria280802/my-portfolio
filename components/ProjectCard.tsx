import { ProjectCardProps } from "../interfaces/Project.ts";

export default function ProjectCard({ repo }: ProjectCardProps) {
  return (
    <div class="bg-background-light dark:bg-background-dark shadow-lg rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-secondary-light/20 dark:border-secondary-dark/20">
      <h2 class="text-2xl font-bold mb-3 text-primary-light dark:text-primary-dark">{repo.name}</h2>
      {repo.description && (
        <p class="mb-4 text-text-light dark:text-text-dark">{repo.description}</p>
      )}
      <div class="space-y-3">
        {repo.languages && repo.languages.length > 0 && (
          <div class="flex flex-wrap gap-2">
            {repo.languages.map((language: string) => (
              <div key={language} class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-accent-light dark:bg-accent-dark"></span>
          <span class="text-sm text-text-light dark:text-text-dark">{language}</span>
              </div>
            ))}
          </div>
        )}
        {repo.topics && repo.topics.length > 0 && (
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
        )}
      </div>
    </div>
  );
}