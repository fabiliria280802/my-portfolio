export interface Hackathon {
    name: string;
    description: string;
    programming_languages: string[];
    topics: string[];
    linkedin_url: string;
  }

  export interface HackathonCardProps {
    hackathon: Hackathon;
  }

  export interface HackathonsListProps {
    hackathons: Hackathon[];
  }