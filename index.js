/**
 * @format
 */

import 'expo/AppEntry';

// Set up global error handling for debugging
if (__DEV__) {
  global.ErrorUtils.setGlobalHandler((error, isFatal) => {
    console.error('Global error caught:', error);
    // We could add more sophisticated error handling here in a production app
  });
}
