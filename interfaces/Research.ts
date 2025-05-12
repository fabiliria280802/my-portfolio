export interface Research {
    name: string;
    summary: string;
    description: string;
    programming_languages: string[];
    topics: string[];
  }

  export interface ResearchCardProps {
    research: Research;
  }

  export interface ResearchesListProps {
    researches: Research[];
  }
  