import { Tabs } from "expo-router";
import React, { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, Text, Linking, View, Alert } from "react-native";

export default function TabLayout() {
  const screenOptions = useMemo(() => ({
    tabBarActiveTintColor: "#f84040",
    tabBarInactiveTintColor: "#bbb",
    tabBarStyle: styles.tabBar,
    tabBarLabelStyle: styles.tabBarLabel,
    headerStyle: styles.header,
    headerShadowVisible: false,
    headerTintColor: "#f56e7d",
  }), []);

  return (
    <Tabs screenOptions={screenOptions}>
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "AushadX",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "home-sharp" : "home-outline"} color={color} size={26} />
          ),
        }}
      />

      {/* Exercise Tab */}
      <Tabs.Screen
        name="exercise"
        options={{
          headerTitle: "Exercise",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "barbell" : "barbell-outline"} color={color} size={26} />
          ),
        }}
      />

      {/* Journal Tab */}
      <Tabs.Screen
        name="journal"
        options={{
          headerTitle: "Journal",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "book" : "book-outline"} color={color} size={26} />
          ),
        }}
      />

      {/* SOS Tab */}
      <Tabs.Screen
        name="sos"
        options={{
          headerTitle: "Emergency SOS",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "alert-circle" : "alert-circle-outline"} color={color} size={26} />
          ),
          tabBarButton: (props) => <SOSButton {...props} />, // Custom SOS Button
        }}
      />

      {/* Chatbot Tab */}
      <Tabs.Screen
        name="chatbot"
        options={{
          headerTitle: "Chatbot",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "chatbubbles" : "chatbubbles-outline"} color={color} size={26} />
          ),
        }}
      />

      {/* Hidden Not Found Tab */}
      <Tabs.Screen name="not-found" options={{ headerShown: false }} />
    </Tabs>
  );
}

// 🆘 Custom SOS Button Component
const SOSButton = ({ onPress }) => {
  const handleSOSPress = () => {
    Alert.alert(
      "Emergency Call",
      "Do you want to call 108 for emergency services?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Call", onPress: () => Linking.openURL("tel:108") },
      ]
    );
  };

  return (
    <TouchableOpacity onPress={handleSOSPress} style={styles.sosButton}>
      <Ionicons name="call" size={26} color="#fff" />
      <Text style={styles.sosText}>SOS</Text>
    </TouchableOpacity>
  );
};

// 🖌 Styles
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#25292e",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, // Android shadow
  },
  tabBar: {
    backgroundColor: "#25292e",
    borderTopWidth: 0, // Removes default border
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, // Android shadow
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
  sosButton: {
    backgroundColor: "#ff3b30", // Red color for emergency
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20, // Capsule shape
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10, // Spacing from the bottom
  },
  sosText: {
    color: "#fff", // White text for contrast
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 8, // Space between icon and text
  },
});

