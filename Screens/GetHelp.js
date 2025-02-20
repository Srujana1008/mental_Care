import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import * as Location from "expo-location";

const GOOGLE_PLACES_API_KEY = "YOUR_GOOGLE_PLACES_API_KEY"; // Replace with your API key

const GetHelp = () => {
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocationAndPlaces = async () => {
      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        setLoading(false);
        return;
      }

      // Get user's location
      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);

      // Fetch nearby counselors and rehabilitation centers
      const { latitude, longitude } = userLocation.coords;
      fetchNearbyPlaces(latitude, longitude);
    };

    fetchLocationAndPlaces();
  }, []);

  const fetchNearbyPlaces = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=hospital&keyword=counseling&key=${GOOGLE_PLACES_API_KEY}`
      );

      const data = await response.json();
      if (data.results) {
        setPlaces(data.results);
      } else {
        alert("No nearby places found");
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nearby Help Centers</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={places}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.vicinity}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default GetHelp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
  