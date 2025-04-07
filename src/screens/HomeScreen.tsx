import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Text } from 'react-native';
import { useAppContext } from '../contexts/AppContext';
import GPASummary from '../components/GPASummary';
import GPATrendChart from '../components/GPATrendChart';
import SemesterCard from '../components/SemesterCard';
import AddSemesterButton from '../components/AddSemesterButton';

const HomeScreen: React.FC = () => {
  const { appData, loading } = useAppContext();
  const { semesters } = appData;

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <GPASummary />
        <GPATrendChart />
        
        {semesters.map(semester => (
          <SemesterCard key={semester.id} semester={semester} />
        ))}
        
        <AddSemesterButton />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#757575',
  },
});

export default HomeScreen; 