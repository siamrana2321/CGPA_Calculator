import { GradeScale } from './types';

// Default grade scales
export const DEFAULT_GRADE_SCALES: GradeScale[] = [
  {
    scale: 4.0,
    grades: {
      'A+': 4.0,
      'A': 3.75,
      'A-': 3.5,
      'B+': 3.25,
      'B': 3.0,
      'B-': 2.75,
      'C+': 2.5,
      'C': 2.25,
      'C-': 2.0,
      'D+': 1.75,
      'D': 1.5,
      'F': 0.0
    }
  },
  {
    scale: 5.0,
    grades: {
      'A+': 5.0,
      'A': 5.0,
      'A-': 4.7,
      'B+': 4.3,
      'B': 4.0,
      'B-': 3.7,
      'C+': 3.3,
      'C': 3.0,
      'C-': 2.7,
      'D+': 2.3,
      'D': 2.0,
      'F': 0.0
    }
  }
];

// Default app settings
export const DEFAULT_APP_SETTINGS = {
  activeGradeScale: DEFAULT_GRADE_SCALES[0],
  gradeScales: DEFAULT_GRADE_SCALES
};

// Storage keys
export const STORAGE_KEYS = {
  APP_DATA: 'cgpa_calculator_app_data'
};

// Available grade options
export const GRADE_OPTIONS = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F']; 