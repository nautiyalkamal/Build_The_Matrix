export interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  category: string;
  description: string;
  imageUrl: string;
  client: string;
  scale: string;
  materials: string[];
  specs: { label: string; value: string }[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  details: string[];
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  quote: string;
  specialities?: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  client: string;
  role: string;
  project: string;
  year: string;
}
