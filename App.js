import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import * as Linking from 'expo-linking';
import * as SMS from 'expo-sms';
import * as Notifications from 'expo-notifications';

// Request Notification Permissions
Notifications.requestPermissionsAsync();

// Import Screens
import Anxiety from './Screens/Anxiety';
import HomeScreen from './Screens/HomeScreen';
import ReliefExercises from './Screens/ReliefExercises';
import Journal from './Screens/Journal';
import BreathingExercise from './Screens/BreathingExerciseScreen';
import MeditationTimer from './Screens/MeditationTimer';
import Depression from './Screens/Depression';
import FoodScreen from './Screens/FoodScreen';
import AnxietyTips from './Screens/AnxietyTips';
import DepressionFood from './Screens/DepressionFood';
import DepressionTips from './Screens/DepressionTips';
import TimeManagement from './Screens/TimeManagement';
import TimeManagementTips from './Screens/TimeManagementTips';
import ToDoList from './Screens/ToDoList';
import Pomodoro from './Screens/Pomodoro';
import TimeManagementVideos from './Screens/TimeManagementVideos';
import AnxietyManagementVideos from './Screens/AnxietyManagementVideos';
import DepressionVideos from './Screens/DepressionVideos';
import AnxietyTest from './Screens/AnxietyTest';
import DepressionTest from './Screens/DepressionTest';
import MentalHealthTest from './Screens/MentalHealthTest';
import SplashScreen from './Screens/SplashScreen';
import HeartRateMonitor from './Screens/HeartRateMonitor';
import BetterSleep from './Screens/BetterSleep';
import SleepMusic from './Screens/SleepMusic';
import MoodTracking from './Screens/MoodTracking';
import Journaling from './Screens/Journaling';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Function to handle SOS Call & Message
const handleSOS = async () => {
  const emergencyNumber = "6300526806"; // Replace with actual emergency contact
  const emergencyMessage = "🚨 Emergency! I need help. Please contact me immediately.";

  // Try sending an SMS
  const { result } = await SMS.sendSMSAsync([emergencyNumber], emergencyMessage);

  // If SMS fails, make a call
  if (result !== 'sent') {
    Linking.openURL(`tel:${emergencyNumber}`);
  }
};

// Bottom Tab Navigator
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Relief') iconName = 'heart';
          else if (route.name === 'Journaling') iconName = 'book';
          else if (route.name === 'Pulse') iconName = 'pulse';
          else if (route.name === 'Mood') iconName = 'happy';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#ECEFF1',
        tabBarStyle: { backgroundColor: '#78909C', height: 70 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Relief" component={ReliefExercises} />
      <Tab.Screen name="Journaling" component={Journaling} />
      <Tab.Screen name="Pulse" component={HeartRateMonitor} />
      <Tab.Screen name="Mood" component={MoodTracking} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <View style={{ flex: 1 }}>
          {/* SOS Button at the top-right corner */}
          <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
            <Ionicons name="call" size={30} color="white" />
          </TouchableOpacity>

          {/* Stack Navigator for Additional Screens */}
          <Stack.Navigator>
  <Stack.Screen 
    name="Main" 
    component={BottomTabs} 
    options={{
      headerShown: true,
      headerStyle: {
        backgroundColor: '#78909C', // Set header background color
      },
      headerTintColor: '#78909C', // Set header text color
    }} 
  />
  {/* Other screens */}

            <Stack.Screen name="Anxiety" component={Anxiety} />
            <Stack.Screen name="AnxietyTips" component={AnxietyTips} />
            <Stack.Screen name="Food" component={FoodScreen} />
            <Stack.Screen name="BreathingExercise" component={BreathingExercise} />
            <Stack.Screen name="MeditationTimer" component={MeditationTimer} />
            <Stack.Screen name="Depression" component={Depression} />
            <Stack.Screen name="DepressionFood" component={DepressionFood} />
            <Stack.Screen name="DepressionTips" component={DepressionTips} />
            <Stack.Screen name="TimeManagement" component={TimeManagement} />
            <Stack.Screen name="TimeManagementTips" component={TimeManagementTips} />
            <Stack.Screen name="ToDoList" component={ToDoList} />
            <Stack.Screen name="Pomodoro" component={Pomodoro} />
            <Stack.Screen name="TimeManagementVideos" component={TimeManagementVideos} />
            <Stack.Screen name="AnxietyManagementVideos" component={AnxietyManagementVideos} />
            <Stack.Screen name="DepressionVideos" component={DepressionVideos} />
            <Stack.Screen name="AnxietyTest" component={AnxietyTest} />
            <Stack.Screen name="DepressionTest" component={DepressionTest} />
            <Stack.Screen name="MentalHealthTest" component={MentalHealthTest} />
            <Stack.Screen name="BetterSleep" component={BetterSleep} />
            <Stack.Screen name="SleepMusic" component={SleepMusic} />
            <Stack.Screen name="MoodTracking" component={MoodTracking} />
            <Stack.Screen name="Journaling" component={Journaling}/>
            <Stack.Screen name="Journal" component={Journal}/>
          </Stack.Navigator>
        </View>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sosButton: {
    position: 'absolute',
    top: 35, // Adjusted to be at the top
    right: 15, // Aligned to the right
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 30,
    width:65,
    alignItems:'center',
    zIndex: 100, // Ensures it's above other elements
    elevation: 5, // Shadow effect
  },
});
