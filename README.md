# CGPA Calculator App

A React Native mobile application that helps students calculate and track their GPA and CGPA across multiple semesters.

## Features

- Add and manage semesters
- Add courses with credit hours and grades
- Automatic GPA and CGPA calculation
- Support for different grading scales (4.0, 5.0)
- Visual GPA trend chart
- Local data persistence
- Clean and intuitive user interface

## Installation

1. Make sure you have Node.js and npm installed on your system
2. Install React Native CLI globally:
   ```
   npm install -g react-native-cli
   ```
3. Clone this repository
4. Navigate to the project directory:
   ```
   cd CGPACalculator
   ```
5. Install dependencies:
   ```
   npm install
   ```
6. For iOS, install pods:
   ```
   cd ios && pod install && cd ..
   ```

## Running the App

### Android

1. Make sure you have Android Studio installed and an Android emulator set up
2. Run the following command:
   ```
   npx react-native run-android
   ```

### iOS

1. Make sure you have Xcode installed
2. Run the following command:
   ```
   npx react-native run-ios
   ```

## Usage

1. **Adding a Semester**
   - Tap the "+ Add New Semester" button
   - Enter a name for the semester (e.g., "Fall 2023")
   - Tap "Add"

2. **Adding Courses**
   - Open a semester by tapping on it
   - Tap "+ Add Course"
   - Enter course name, credit hours, and select grade
   - Tap "Add"

3. **Managing Courses**
   - Edit: Tap the "Edit" button on a course
   - Delete: Tap the "Delete" button on a course

4. **Managing Semesters**
   - Edit: Tap the "Edit" button on a semester
   - Delete: Tap the "Delete" button on a semester
   - View Details: Tap on the semester to expand/collapse

5. **Viewing Statistics**
   - Overall CGPA is displayed at the top
   - GPA trend chart shows progression over semesters
   - Individual semester GPAs are shown on each semester card

## Dependencies

- React Native
- React Navigation
- React Native Chart Kit
- AsyncStorage
- React Native SVG

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
