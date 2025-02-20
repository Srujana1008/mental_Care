import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Icons
import * as Linking from 'expo-linking';
import * as SMS from 'expo-sms';

// Import Screens
import HomeScreen from './Screens/HomeScreen';
import ReliefExercises from './Screens/ReliefExercises';
import Journal from './Screens/Journal';
import Anxiety from './Screens/Anxiety';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Function to handle SOS Call & Message
const handleSOS = async () => {
  const emergencyNumber = "6300526806"; // Change this to actual emergency contact
  const emergencyMessage = "🚨 Emergency! I need help. Please contact me immediately.";

  // Try sending an SMS
  const { result } = await SMS.sendSMSAsync([emergencyNumber], emergencyMessage);
  
  // If SMS fails, make a call
  if (result !== 'sent') {
    Linking.openURL(`tel:${emergencyNumber}`);
  }
};

// Loading Screen
const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Main'); // Navigate to Main (Bottom Tabs) after 2 seconds
    }, 2000);
  }, []);

  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Take a deep breath...</Text>
    </View>
  );
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

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#fff', height: 60 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Relief" component={ReliefExercises} />
      <Tab.Screen name="Journal" component={Journal} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        {/* Stack Navigator for Screens Outside Footer */}
        <Stack.Navigator initialRouteName="Loading">
          <Stack.Screen 
            name="Loading" 
            component={LoadingScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Main" 
            component={BottomTabs} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen name="Anxiety" component={Anxiety} />
        </Stack.Navigator>

        {/* Floating SOS Button */}
        <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
          <Ionicons name="alert" size={30} color="white" />
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sosButton: {
    position: 'absolute',
    bottom: 80, // Adjust above footer
    right: 20, // Right corner
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  sosText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ADD8E6', // Light blue background
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});