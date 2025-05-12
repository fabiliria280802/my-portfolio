export interface Experience {
    company_name: string;
    company_website: string;
    role_name: string;
    role_description: string;
    programming_languages: string[];
    linkedin_url: string;
  }
  
  export interface ExperienceCardProps {
    experience: Experience;
  }

  export interface ExperiencesListProps {
    experiences: Experience[];
  }