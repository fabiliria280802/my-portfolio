export interface Certificate {
    name: string;
    issuer: string;
    issue_date: Date;
    expiration_date: Date;
    credential_id: string;
    credential_url: string;
    credential_image: string;
    credential_description: string;
    credential_topics: string[];
    linkedin_url: string;
  }
  
  export interface CertificateCardProps {
    cert: Certificate;
  }
  
  export interface CertificatesListProps {
    certs: Certificate[];
  }