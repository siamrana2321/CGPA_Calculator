import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppData } from './types';
import { STORAGE_KEYS, DEFAULT_APP_SETTINGS } from './constants';

/**
 * Save app data to AsyncStorage
 * @param data App data to save
 */
export const saveAppData = async (data: AppData): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(data);
    console.log('Saving app data:', jsonValue.substring(0, 50) + '...');
    await AsyncStorage.setItem(STORAGE_KEYS.APP_DATA, jsonValue);
    console.log('App data saved successfully');
  } catch (error) {
    console.error('Error saving app data:', error);
    // Alert or notify the user in a production app
  }
};

/**
 * Load app data from AsyncStorage
 * @returns Loaded app data or default if not found
 */
export const loadAppData = async (): Promise<AppData> => {
  try {
    const dataString = await AsyncStorage.getItem(STORAGE_KEYS.APP_DATA);
    if (dataString) {
      console.log('App data loaded successfully');
      try {
        const parsedData = JSON.parse(dataString);
        return parsedData;
      } catch (parseError) {
        console.error('Error parsing app data:', parseError);
        return getDefaultAppData();
      }
    }
    
    console.log('No saved data found, returning default app data');
    return getDefaultAppData();
  } catch (error) {
    console.error('Error loading app data:', error);
    return getDefaultAppData();
  }
};

/**
 * Get default app data structure
 */
const getDefaultAppData = (): AppData => {
  return {
    semesters: [],
    settings: DEFAULT_APP_SETTINGS
  };
}; 