import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAppContext } from '../contexts/AppContext';
import { Course } from '../utils/types';
import CourseForm from './CourseForm';
import { THEME } from '../utils/theme';

interface CourseListProps {
  semesterId: string;
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ semesterId, courses }) => {
  const { deleteCourse } = useAppContext();
  
  const [courseFormVisible, setCourseFormVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setCourseFormVisible(true);
  };

  const handleAddCourse = () => {
    setEditingCourse(null);
    setCourseFormVisible(true);
  };

  const handleDeleteCourse = (courseId: string) => {
    Alert.alert(
      'Delete Course',
      'Are you sure you want to delete this course?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: () => deleteCourse(semesterId, courseId),
          style: 'destructive' 
        }
      ]
    );
  };

  const handleCloseForm = () => {
    setCourseFormVisible(false);
    setEditingCourse(null);
  };

  if (courses.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No courses added yet</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddCourse}
        >
          <Text style={styles.addButtonText}>Add Course</Text>
        </TouchableOpacity>
        
        <CourseForm
          visible={courseFormVisible}
          onClose={handleCloseForm}
          semesterId={semesterId}
          initialCourse={undefined}
          isEditing={false}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {courses.map((course) => (
        <View key={course.id} style={styles.courseItem}>
          <View style={styles.courseInfo}>
            <Text style={styles.courseName}>{course.name}</Text>
            <View style={styles.courseDetails}>
              <Text style={styles.creditHours}>{course.creditHours} Credits</Text>
              <Text style={styles.separator}>•</Text>
              <Text style={styles.grade}>Grade: {course.grade}</Text>
            </View>
          </View>
          
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditCourse(course)}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteCourse(course.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      
      <TouchableOpacity
        style={styles.addCourseButton}
        onPress={handleAddCourse}
      >
        <Text style={styles.addCourseButtonText}>+ Add Course</Text>
      </TouchableOpacity>
      
      <CourseForm
        visible={courseFormVisible}
        onClose={handleCloseForm}
        semesterId={semesterId}
        initialCourse={editingCourse || undefined}
        isEditing={!!editingCourse}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: THEME.spacing.s,
  },
  emptyContainer: {
    padding: THEME.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.colors.inputBg,
    borderRadius: THEME.radius.m,
  },
  emptyText: {
    ...THEME.typography.body,
    color: THEME.colors.textLight,
    marginBottom: THEME.spacing.m,
  },
  courseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: THEME.spacing.m,
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.radius.m,
    marginBottom: THEME.spacing.s,
    ...THEME.shadows.small,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    ...THEME.typography.body,
    fontWeight: 'bold',
    color: THEME.colors.text,
  },
  courseDetails: {
    flexDirection: 'row',
    marginTop: THEME.spacing.xs,
    alignItems: 'center',
  },
  creditHours: {
    ...THEME.typography.caption,
    color: THEME.colors.textLight,
  },
  separator: {
    marginHorizontal: THEME.spacing.xs,
    color: THEME.colors.textLight,
  },
  grade: {
    ...THEME.typography.caption,
    color: THEME.colors.primary,
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    padding: THEME.spacing.s,
    backgroundColor: THEME.colors.highlight,
    borderRadius: THEME.radius.s,
    marginRight: THEME.spacing.s,
  },
  editButtonText: {
    color: THEME.colors.primary,
    fontWeight: '500',
  },
  deleteButton: {
    padding: THEME.spacing.s,
    backgroundColor: '#ffebee',
    borderRadius: THEME.radius.s,
  },
  deleteButtonText: {
    color: THEME.colors.error,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: THEME.colors.primary,
    paddingVertical: THEME.spacing.s,
    paddingHorizontal: THEME.spacing.m,
    borderRadius: THEME.radius.s,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addCourseButton: {
    backgroundColor: THEME.colors.primary,
    padding: THEME.spacing.m,
    borderRadius: THEME.radius.m,
    alignItems: 'center',
    marginTop: THEME.spacing.s,
  },
  addCourseButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CourseList;