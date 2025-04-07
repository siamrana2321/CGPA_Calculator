export interface Course {
  id: string;
  name: string;
  creditHours: number;
  grade: string;
  gradePoint: number;
}

export interface Semester {
  id: string;
  name: string;
  courses: Course[];
  gpa: number;
}

export interface GradeScale {
  scale: number; // 4.0, 5.0 etc.
  grades: {
    [key: string]: number; // e.g. { 'A+': 4.0, 'A': 3.7, ... }
  };
}

export interface AppSettings {
  activeGradeScale: GradeScale;
  gradeScales: GradeScale[];
}

export interface AppData {
  semesters: Semester[];
  settings: AppSettings;
} 