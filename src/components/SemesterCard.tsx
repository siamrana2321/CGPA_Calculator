import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useAppContext } from '../contexts/AppContext';
import { Semester } from '../utils/types';
import CourseList from './CourseList';
import { THEME } from '../utils/theme';

/**
 * Formats a GPA value to display with exactly 2 decimal places
 */
const formatGPA = (gpa: number): string => {
  return gpa.toFixed(2);
};

interface SemesterCardProps {
  semester: Semester;
}

const SemesterCard: React.FC<SemesterCardProps> = ({ semester }) => {
  const { updateSemester, deleteSemester } = useAppContext();
  
  const [isEditing, setIsEditing] = useState(false);
  const [semesterName, setSemesterName] = useState(semester.name);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleUpdateName = () => {
    if (semesterName.trim() !== '') {
      updateSemester(semester.id, semesterName.trim());
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Semester',
      `Are you sure you want to delete "${semester.name}" and all its courses?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: () => deleteSemester(semester.id),
          style: 'destructive' 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={semesterName}
              onChangeText={setSemesterName}
              onBlur={handleUpdateName}
              autoFocus
            />
          ) : (
            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
              <View style={styles.semesterInfo}>
                <Text style={styles.semesterName}>{semester.name}</Text>
                <Text style={styles.gpa}>GPA: {formatGPA(semester.gpa)}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.expandButton}
            onPress={() => setIsExpanded(!isExpanded)}
          >
            <Text style={styles.expandButtonText}>
              {isExpanded ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {isExpanded && (
        <View style={styles.content}>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{semester.courses.length}</Text>
              <Text style={styles.statLabel}>Courses</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>
                {semester.courses.reduce((sum, course) => sum + course.creditHours, 0)}
              </Text>
              <Text style={styles.statLabel}>Credits</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{formatGPA(semester.gpa)}</Text>
              <Text style={styles.statLabel}>GPA</Text>
            </View>
          </View>

          <CourseList semesterId={semester.id} courses={semester.courses} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.radius.m,
    marginHorizontal: THEME.spacing.m,
    marginBottom: THEME.spacing.m,
    overflow: 'hidden',
    ...THEME.shadows.medium
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: THEME.spacing.m,
    backgroundColor: THEME.colors.inputBg,
  },
  titleContainer: {
    flex: 1,
    marginRight: THEME.spacing.s,
  },
  semesterInfo: {
    flexDirection: 'column',
  },
  semesterName: {
    ...THEME.typography.subtitle,
    color: THEME.colors.textMedium,
  },
  gpa: {
    ...THEME.typography.caption,
    color: THEME.colors.primary,
    fontWeight: '500',
    marginTop: THEME.spacing.xs,
  },
  input: {
    ...THEME.typography.subtitle,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: THEME.radius.s,
    padding: THEME.spacing.s,
    backgroundColor: THEME.colors.surface,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    padding: THEME.spacing.s,
    marginRight: THEME.spacing.s,
    backgroundColor: THEME.colors.highlight,
    borderRadius: THEME.radius.s,
  },
  editButtonText: {
    color: THEME.colors.primary,
    fontWeight: '500',
  },
  deleteButton: {
    padding: THEME.spacing.s,
    backgroundColor: '#ffebee',
    borderRadius: THEME.radius.s,
    marginRight: THEME.spacing.s,
  },
  deleteButtonText: {
    color: THEME.colors.error,
    fontWeight: '500',
  },
  expandButton: {
    padding: THEME.spacing.s,
    backgroundColor: '#e8f5e9',
    borderRadius: THEME.radius.s,
  },
  expandButtonText: {
    color: THEME.colors.success,
    fontWeight: '500',
  },
  content: {
    padding: THEME.spacing.m,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: THEME.spacing.m,
    paddingBottom: THEME.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    ...THEME.typography.subtitle,
    color: THEME.colors.textMedium,
  },
  statLabel: {
    ...THEME.typography.caption,
    color: THEME.colors.textLight,
    marginTop: THEME.spacing.xs,
  },
});

export default SemesterCard; 