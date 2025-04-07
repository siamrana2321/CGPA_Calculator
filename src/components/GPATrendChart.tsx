import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
// @ts-ignore: Module has no type declarations
import { LineChart } from 'react-native-chart-kit';
import { useAppContext } from '../contexts/AppContext';
import { calculateCGPA } from '../utils/calculations';

const GPATrendChart: React.FC = () => {
  const { appData } = useAppContext();
  const { semesters } = appData;

  if (semesters.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No data available for GPA trend</Text>
      </View>
    );
  }

  // Calculate cumulative GPA for each semester
  const gpaData = semesters.map((_, index) => {
    const semesterSubset = semesters.slice(0, index + 1);
    return calculateCGPA(semesterSubset);
  });

  const chartData = {
    labels: semesters.map(semester => semester.name),
    datasets: [
      {
        data: gpaData,
        color: (opacity = 1) => `rgba(30, 136, 229, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(30, 136, 229, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(66, 66, 66, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#1e88e5',
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GPA Trend</Text>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        withInnerLines={false}
        withOuterLines={true}
        withVerticalLines={false}
        withHorizontalLines={true}
        withVerticalLabels={true}
        withHorizontalLabels={true}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1}
        segments={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
  emptyContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emptyText: {
    fontSize: 16,
    color: '#9e9e9e',
  },
});

export default GPATrendChart; 