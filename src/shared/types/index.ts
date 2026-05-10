export interface SelectedJob {
  id: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
  location?: string;
  experience?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  skills: string[];
  experience: any[];
  education: any[];
}
