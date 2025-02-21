import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Icons
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import * as Linking from 'expo-linking';
import * as SMS from 'expo-sms';
import * as Notifications from 'expo-notifications';
import  { useState, useEffect } from 'react';

Notifications.requestPermissionsAsync();
// Import Screens
import Anxiety from './Screens/Anxiety';
import HomeScreen from './Screens/HomeScreen';
import ReliefExercises from './Screens/ReliefExercises';
import Journal from './Screens/Journal';
import  BreathingExercise  from './Screens/BreathingExerciseScreen';
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







const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Function to handle SOS Call & Message
const handleSOS = async () => {
  const emergencyNumber = "6300526806"; // Change to actual emergency contact
  const emergencyMessage = "🚨 Emergency! I need help. Please contact me immediately.";

  // Try sending an SMS
  const { result } = await SMS.sendSMSAsync([emergencyNumber], emergencyMessage);
  
  // If SMS fails, make a call
  if (result !== 'sent') {
    Linking.openURL(`tel:${emergencyNumber}`);
  }
};

// Bottom Tab Navigator (Footer)
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Relief') iconName = 'heart';
          else if (route.name === 'Journal') iconName = 'book';
          else if (route.name === 'Pulse') iconName = 'pulse';
          else if (route.name === 'Mood') iconName = 'happy';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#fff', height: 70 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Relief" component={ReliefExercises} />

      {/* SOS Button in Footer */}
      <Tab.Screen
        name="SOS"
        component={HomeScreen} // Temporary, can be any screen
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity 
              style={styles.sosButton}
              onPress={handleSOS}
            >
              <Ionicons name="call" size={30} color="white" />
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen name="Journal" component={Journal} />
      <Tab.Screen name="Pulse" component={HeartRateMonitor} />
      <Tab.Screen name="Mood" component={MoodTracking}/>
    </Tab.Navigator>
  );
}



export default function App() {
  
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false); // Hide splash screen after 3 seconds
      }, 3000);
    }, []);
  return (
    <NavigationContainer>
    {isLoading ? (
        <SplashScreen />
      ) : (
      <View style={{ flex: 1 }}>
        {/* Stack Navigator for Screens Outside Footer */}
        <Stack.Navigator>
          <Stack.Screen 
            name="Main" 
            component={BottomTabs} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen name="Anxiety" component={Anxiety} />
          <Stack.Screen name="AnxietyTips" component={AnxietyTips} />
          <Stack.Screen name="Food" component={FoodScreen} />
          <Stack.Screen name="BreathingExercise" component={BreathingExercise} />
          <Stack.Screen name="MeditationTimer" component={MeditationTimer} />
          <Stack.Screen name="Depression" component={Depression} />
          <Stack.Screen name="DepressionFood" component={DepressionFood} />
          <Stack.Screen name="DepressionTips" component={DepressionTips} />
          <Stack.Screen name="TimeManagement" component={TimeManagement} />
          <Stack.Screen name="TimeManagementTips" component={TimeManagementTips}/>
          <Stack.Screen name="ToDoList" component={ToDoList}/>
          <Stack.Screen name="Pomodoro" component={Pomodoro} />
          <Stack.Screen name="TimeManagementVideos" component={TimeManagementVideos}/>
          <Stack.Screen name="AnxietyManagementVideos" component={AnxietyManagementVideos}/>
          <Stack.Screen name="DepressionVideos" component={DepressionVideos}/>
          <Stack.Screen name="AnxietyTest" component={AnxietyTest}/>
          <Stack.Screen name="DepressionTest" component={DepressionTest}/>
          <Stack.Screen name="MentalHealthTest" component={MentalHealthTest}/>
          <Stack.Screen name="BetterSleep" component={BetterSleep} /> 
          <Stack.Screen name="SleepMusic" component={SleepMusic}/>
          <Stack.Screen name="MoodTracking" component={MoodTracking} />
          



        </Stack.Navigator>

       
      </View>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sosButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    position: 'absolute',
    bottom: 10, // Align with tab bar
  },
  
});