import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, FlatList, SafeAreaView } from 'react-native';

const topics = [
  { name: "Anxiety", image: require('../assets/morning.jpg'), screen: "Anxiety" },
  { name: "Depression", image: require('../assets/present.jpg'), screen: "Depression" },
  { name: "Time Management", image: require('../assets/energizing.jpg'), screen: "TimeManagement" },
  { name: "Mental Health Test", image: require('../assets/morning.jpg'), screen: "MentalHealthTest" }
];

const HomeScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate(item.screen)}
    >
      <ImageBackground 
        source={item.image} 
        style={styles.cardImage} 
        imageStyle={{ borderRadius: 20 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.cardText}>{item.name}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Heading */}
      <Text style={styles.title}>
        <Text style={styles.yourText}>Find</Text> <Text style={styles.practicesText}>Support for Your Journey</Text>
      </Text>

      {/* List of Topics */}
      <FlatList 
        data={topics}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#E5ECF4', 
    paddingHorizontal: 45, // Increased padding to prevent touching borders
    paddingTop: 60 // Adjusted top padding for better spacing
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20 // Slightly increased spacing
  },
  yourText: { 
    fontSize: 24, 
    fontFamily: 'serif', 
    fontStyle: 'italic', 
    textAlign: 'center',
    color: '#333' 
  },
  practicesText: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#222'
  },
  card: {
    marginBottom: 25, // Increased spacing between cards
    borderRadius: 50,
    overflow: 'hidden',
    paddingHorizontal: 10 // Ensuring more space inside
  },
  cardImage: {
    width: '100%',
    height: 160, // Slightly increased height for better visuals
    justifyContent: 'center'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  }
});


export default HomeScreen;
