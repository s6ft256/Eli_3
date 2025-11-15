
export enum Page {
  Home = 'Home',
  About = 'About',
  Courses = 'Courses',
  Contact = 'Contact',
}

export interface NavItem {
  name: string;
  page: Page;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  color: string;
}

export interface PortfolioItem {
  title: string;
  image: string;
}

export interface Course {
    s_no?: string | number;
    code: string;
    programme: string;
    // FIX: Made these properties optional as they are not available for all courses in constants.ts
    first_quarter?: string;
    second_quarter?: string;
    third_quarter?: string;
    fourth_quarter?: string;
    location?: string;
    duration: string;
}

export interface CourseCategory {
    name: string;
    courses: Course[];
}