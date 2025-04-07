import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppData, Semester, Course, GradeScale } from '../utils/types';
import { loadAppData, saveAppData } from '../utils/storage';
import { calculateSemesterGPA, getGradePoint } from '../utils/calculations';
import { DEFAULT_APP_SETTINGS } from '../utils/constants';

interface AppContextType {
  appData: AppData;
  loading: boolean;
  addSemester: (name: string) => void;
  updateSemester: (semesterId: string, name: string) => void;
  deleteSemester: (semesterId: string) => void;
  addCourse: (semesterId: string, course: Omit<Course, 'id' | 'gradePoint'>) => void;
  updateCourse: (semesterId: string, courseId: string, course: Omit<Course, 'id' | 'gradePoint'>) => void;
  deleteCourse: (semesterId: string, courseId: string) => void;
  setActiveGradeScale: (scale: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [appData, setAppData] = useState<AppData>({
    semesters: [],
    settings: DEFAULT_APP_SETTINGS
  });
  const [loading, setLoading] = useState(true);

  // Load data on initial render
  useEffect(() => {
    const fetchData = async () => {
      const data = await loadAppData();
      setAppData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Save data when it changes
  useEffect(() => {
    if (!loading) {
      saveAppData(appData);
    }
  }, [appData, loading]);

  const addSemester = (name: string) => {
    const newSemester: Semester = {
      id: Date.now().toString(),
      name,
      courses: [],
      gpa: 0
    };

    setAppData(prev => ({
      ...prev,
      semesters: [...prev.semesters, newSemester]
    }));
  };

  const updateSemester = (semesterId: string, name: string) => {
    setAppData(prev => ({
      ...prev,
      semesters: prev.semesters.map(semester => 
        semester.id === semesterId ? { ...semester, name } : semester
      )
    }));
  };

  const deleteSemester = (semesterId: string) => {
    setAppData(prev => ({
      ...prev,
      semesters: prev.semesters.filter(semester => semester.id !== semesterId)
    }));
  };

  const addCourse = (semesterId: string, course: Omit<Course, 'id' | 'gradePoint'>) => {
    const gradePoint = getGradePoint(course.grade, appData.settings.activeGradeScale);
    
    const newCourse: Course = {
      id: Date.now().toString(),
      ...course,
      gradePoint
    };

    const updatedSemesters = appData.semesters.map(semester => {
      if (semester.id === semesterId) {
        const updatedCourses = [...semester.courses, newCourse];
        const gpa = calculateSemesterGPA(updatedCourses, appData.settings.activeGradeScale);
        return { ...semester, courses: updatedCourses, gpa };
      }
      return semester;
    });

    setAppData(prev => ({
      ...prev,
      semesters: updatedSemesters
    }));
  };

  const updateCourse = (semesterId: string, courseId: string, course: Omit<Course, 'id' | 'gradePoint'>) => {
    const gradePoint = getGradePoint(course.grade, appData.settings.activeGradeScale);
    
    const updatedSemesters = appData.semesters.map(semester => {
      if (semester.id === semesterId) {
        const updatedCourses = semester.courses.map(c => 
          c.id === courseId ? { ...c, ...course, gradePoint } : c
        );
        const gpa = calculateSemesterGPA(updatedCourses, appData.settings.activeGradeScale);
        return { ...semester, courses: updatedCourses, gpa };
      }
      return semester;
    });

    setAppData(prev => ({
      ...prev,
      semesters: updatedSemesters
    }));
  };

  const deleteCourse = (semesterId: string, courseId: string) => {
    const updatedSemesters = appData.semesters.map(semester => {
      if (semester.id === semesterId) {
        const updatedCourses = semester.courses.filter(c => c.id !== courseId);
        const gpa = calculateSemesterGPA(updatedCourses, appData.settings.activeGradeScale);
        return { ...semester, courses: updatedCourses, gpa };
      }
      return semester;
    });

    setAppData(prev => ({
      ...prev,
      semesters: updatedSemesters
    }));
  };

  const setActiveGradeScale = (scale: number) => {
    // Find the grade scale with the matching scale value
    const selectedGradeScale = appData.settings.gradeScales.find(gs => gs.scale === scale);
    
    if (!selectedGradeScale) return;

    // Recalculate grade points and GPAs for all courses and semesters
    const updatedSemesters = appData.semesters.map(semester => {
      const updatedCourses = semester.courses.map(course => ({
        ...course,
        gradePoint: getGradePoint(course.grade, selectedGradeScale)
      }));
      
      const gpa = calculateSemesterGPA(updatedCourses, selectedGradeScale);
      
      return {
        ...semester,
        courses: updatedCourses,
        gpa
      };
    });

    setAppData(prev => ({
      ...prev,
      semesters: updatedSemesters,
      settings: {
        ...prev.settings,
        activeGradeScale: selectedGradeScale
      }
    }));
  };

  const value = {
    appData,
    loading,
    addSemester,
    updateSemester,
    deleteSemester,
    addCourse,
    updateCourse,
    deleteCourse,
    setActiveGradeScale
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}; 