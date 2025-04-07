import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useAppContext } from '../contexts/AppContext';
import { THEME } from '../utils/theme';

const AddSemesterButton: React.FC = () => {
  const { addSemester } = useAppContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [semesterName, setSemesterName] = useState('');

  const handleAddSemester = () => {
    if (semesterName.trim() !== '') {
      addSemester(semesterName.trim());
      setSemesterName('');
      setModalVisible(false);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add New Semester</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Semester</Text>
            
            <Text style={styles.label}>Semester Name</Text>
            <TextInput
              style={styles.input}
              value={semesterName}
              onChangeText={setSemesterName}
              placeholder="e.g. Fall 2023"
              placeholderTextColor="#9e9e9e"
              autoFocus
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setSemesterName('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={handleAddSemester}
              >
                <Text style={styles.submitButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: THEME.colors.primary,
    padding: THEME.spacing.m,
    borderRadius: THEME.radius.m,
    alignItems: 'center',
    justifyContent: 'center',
    margin: THEME.spacing.m,
    ...THEME.shadows.medium,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
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
    ...THEME.shadows.medium
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: THEME.spacing.s,
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
  },
});

export default AddSemesterButton; 