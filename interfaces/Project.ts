export interface Repository {
    name: string;
    html_url: string;
    description: string;
    languages: string[];
    topics: string[];
  }

export interface ProjectCardProps {
    repo: Repository;
}

export interface ProjectsListProps {
  repos: Repository[];
}