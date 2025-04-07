import { Course, Semester, GradeScale } from './types';

/**
 * Calculate GPA for a single semester with high precision
 * @param courses List of courses in the semester
 * @param gradeScale The grade scale to use for calculation
 * @returns GPA for the semester
 */
export const calculateSemesterGPA = (courses: Course[], gradeScale: GradeScale): number => {
  if (courses.length === 0) return 0;

  let totalCreditPoints = 0;
  let totalCreditHours = 0;

  courses.forEach(course => {
    totalCreditPoints += course.gradePoint * course.creditHours;
    totalCreditHours += course.creditHours;
  });

  // Calculate exact value without rounding
  const exactGPA = totalCreditHours > 0 ? totalCreditPoints / totalCreditHours : 0;
  
  // Return the exact value rounded to 2 decimal places for display
  return Math.round(exactGPA * 100) / 100;
};

/**
 * Calculate CGPA across all semesters with high precision
 * @param semesters List of all semesters
 * @returns CGPA across all semesters
 */
export const calculateCGPA = (semesters: Semester[]): number => {
  if (semesters.length === 0) return 0;

  let totalCreditPoints = 0;
  let totalCreditHours = 0;

  semesters.forEach(semester => {
    semester.courses.forEach(course => {
      totalCreditPoints += course.gradePoint * course.creditHours;
      totalCreditHours += course.creditHours;
    });
  });

  // Calculate exact value without rounding
  const exactGPA = totalCreditHours > 0 ? totalCreditPoints / totalCreditHours : 0;
  
  // Return the exact value rounded to 2 decimal places for display
  return Math.round(exactGPA * 100) / 100;
};

/**
 * Get grade point for a letter grade based on the selected grade scale
 * @param letterGrade Letter grade (A, B+, etc.)
 * @param gradeScale The grade scale to use
 * @returns Grade point value
 */
export const getGradePoint = (letterGrade: string, gradeScale: GradeScale): number => {
  return gradeScale.grades[letterGrade] !== undefined ? gradeScale.grades[letterGrade] : 0;
}; 