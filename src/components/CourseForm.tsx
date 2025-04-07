import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  ScrollView,
  Alert
} from 'react-native';
import { useAppContext } from '../contexts/AppContext';
import { GRADE_OPTIONS } from '../utils/constants';
import { Course } from '../utils/types';
import { THEME } from '../utils/theme';

interface CourseFormProps {
  visible: boolean;
  onClose: () => void;
  semesterId: string;
  initialCourse?: {id: string} & Omit<Course, 'id' | 'gradePoint'>;
  isEditing?: boolean;
}

const CourseForm: React.FC<CourseFormProps> = ({ 
  visible, 
  onClose, 
  semesterId, 
  initialCourse,
  isEditing = false 
}) => {
  const { addCourse, updateCourse } = useAppContext();
  
  const [courseName, setCourseName] = useState('');
  const [creditHours, setCreditHours] = useState('');
  const [selectedGrade, setSelectedGrade] = useState(GRADE_OPTIONS[0]);
  const [showGradeOptions, setShowGradeOptions] = useState(false);

  useEffect(() => {
    if (initialCourse && visible) {
      setCourseName(initialCourse.name);
      setCreditHours(initialCourse.creditHours.toString());
      setSelectedGrade(initialCourse.grade);
    } else if (!initialCourse && visible) {
      // Reset form when opening for a new course
      setCourseName('');
      setCreditHours('');
      setSelectedGrade(GRADE_OPTIONS[0]);
    }
  }, [visible, initialCourse]);

  const handleSubmit = () => {
    if (!courseName.trim()) {
      Alert.alert('Error', 'Please enter a course name');
      return;
    }
    
    if (!creditHours.trim()) {
      Alert.alert('Error', 'Please enter credit hours');
      return;
    }
    
    if (isNaN(parseFloat(creditHours)) || parseFloat(creditHours) <= 0) {
      Alert.alert('Error', 'Please enter a valid credit hour value');
      return;
    }

    const courseData = {
      name: courseName.trim(),
      creditHours: parseFloat(creditHours),
      grade: selectedGrade
    };

    try {
      if (isEditing && initialCourse) {
        updateCourse(semesterId, initialCourse.id, courseData);
      } else {
        addCourse(semesterId, courseData);
      }
      
      // Reset form and close modal
      setCourseName('');
      setCreditHours('');
      setSelectedGrade(GRADE_OPTIONS[0]);
      setShowGradeOptions(false);
      onClose();
    } catch (error) {
      console.error('Error saving course:', error);
      Alert.alert('Error', 'There was a problem saving the course. Please try again.');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {isEditing ? 'Edit Course' : 'Add New Course'}
          </Text>

          <Text style={styles.label}>Course Name</Text>
          <TextInput
            style={styles.input}
            value={courseName}
            onChangeText={setCourseName}
            placeholder="e.g. Introduction to Computer Science"
            placeholderTextColor="#9e9e9e"
          />

          <Text style={styles.label}>Credit Hours</Text>
          <TextInput
            style={styles.input}
            value={creditHours}
            onChangeText={setCreditHours}
            placeholder="e.g. 3"
            placeholderTextColor="#9e9e9e"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Grade</Text>
          <TouchableOpacity 
            style={styles.gradeSelector}
            onPress={() => setShowGradeOptions(!showGradeOptions)}
          >
            <Text style={styles.selectedGrade}>{selectedGrade}</Text>
          </TouchableOpacity>

          {showGradeOptions && (
            <View style={styles.gradeOptionsContainer}>
              <ScrollView style={styles.gradeOptionsList}>
                {GRADE_OPTIONS.map((grade) => (
                  <TouchableOpacity
                    key={grade}
                    style={[
                      styles.gradeOption,
                      grade === selectedGrade && styles.selectedGradeOption
                    ]}
                    onPress={() => {
                      setSelectedGrade(grade);
                      setShowGradeOptions(false);
                    }}
                  >
                    <Text 
                      style={[
                        styles.gradeText,
                        grade === selectedGrade && styles.selectedGradeText
                      ]}
                    >
                      {grade}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.submitButton]} 
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>
                {isEditing ? 'Update' : 'Add'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.radius.l,
    padding: THEME.spacing.l,
    width: '90%',
    maxWidth: 400,
    ...THEME.shadows.medium,
  },
  modalTitle: {
    ...THEME.typography.subtitle,
    marginBottom: THEME.spacing.l,
    textAlign: 'center',
    color: THEME.colors.primary,
  },
  label: {
    ...THEME.typography.body,
    marginBottom: THEME.spacing.xs,
    fontWeight: '500',
    color: THEME.colors.textMedium,
  },
  input: {
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: THEME.radius.s,
    padding: THEME.spacing.m,
    marginBottom: THEME.spacing.m,
    fontSize: 16,
    backgroundColor: THEME.colors.inputBg,
  },
  gradeSelector: {
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: THEME.radius.s,
    padding: THEME.spacing.m,
    marginBottom: THEME.spacing.m,
    backgroundColor: THEME.colors.inputBg,
  },
  selectedGrade: {
    fontSize: 16,
    color: THEME.colors.textMedium,
  },
  gradeOptionsContainer: {
    marginBottom: THEME.spacing.m,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: THEME.radius.s,
    maxHeight: 150,
  },
  gradeOptionsList: {
    padding: THEME.spacing.xs,
  },
  gradeOption: {
    padding: THEME.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
  },
  selectedGradeOption: {
    backgroundColor: THEME.colors.highlight,
  },
  gradeText: {
    fontSize: 16,
    color: THEME.colors.textMedium,
  },
  selectedGradeText: {
    fontWeight: 'bold',
    color: THEME.colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: THEME.spacing.m,
  },
  button: {
    flex: 1,
    padding: THEME.spacing.m,
    borderRadius: THEME.radius.s,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: THEME.colors.inputBg,
    marginRight: THEME.spacing.s,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  submitButton: {
    backgroundColor: THEME.colors.primary,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: THEME.colors.textLight,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  }
});

export default CourseForm; 