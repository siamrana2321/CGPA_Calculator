import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppContext } from '../contexts/AppContext';
import { calculateCGPA } from '../utils/calculations';
import { THEME } from '../utils/theme';

/**
 * Formats a GPA value to display with exactly 2 decimal places
 */
const formatGPA = (gpa: number): string => {
  return gpa.toFixed(2);
};

const GPASummary = () => {
  const { appData } = useAppContext();
  const cgpa = calculateCGPA(appData.semesters);
  const semesterCount = appData.semesters.length;
  const scale = appData.settings.activeGradeScale.scale;

  return (
    <View style={styles.container}>
      <View style={styles.cgpaContainer}>
        <Text style={styles.cgpaValue}>{formatGPA(cgpa)}</Text>
        <Text style={styles.cgpaLabel}>CGPA</Text>
        <Text style={styles.scaleLabel}>(Scale: {scale.toFixed(1)})</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{semesterCount}</Text>
          <Text style={styles.statLabel}>Semesters</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {appData.semesters.reduce((total, semester) => total + semester.courses.length, 0)}
          </Text>
          <Text style={styles.statLabel}>Courses</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {appData.semesters.reduce((total, semester) => {
              return total + semester.courses.reduce((sum, course) => sum + course.creditHours, 0);
            }, 0)}
          </Text>
          <Text style={styles.statLabel}>Credits</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.radius.m,
    padding: THEME.spacing.m,
    margin: THEME.spacing.m,
    ...THEME.shadows.medium
  },
  cgpaContainer: {
    alignItems: 'center',
    marginBottom: THEME.spacing.m,
  },
  cgpaValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: THEME.colors.primary,
  },
  cgpaLabel: {
    fontSize: 18,
    color: THEME.colors.textLight,
  },
  scaleLabel: {
    fontSize: 14,
    color: THEME.colors.textLight,
    marginTop: THEME.spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
    paddingTop: THEME.spacing.m,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME.colors.textMedium,
  },
  statLabel: {
    fontSize: 14,
    color: THEME.colors.textLight,
  },
});

export default GPASummary; 