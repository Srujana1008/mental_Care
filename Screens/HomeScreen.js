import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const topics = [
  { name: "Anxiety", image: require('../assets/morning.jpg'), screen: "Anxiety" },
  { name: "Depression", image: require('../assets/present.jpg'), screen: "Depression" },
  { name: "Time Management", image: require('../assets/energizing.jpg'), screen: "TimeManagement" }
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.title}>
        <Text style={styles.yourText}>Find</Text> <Text style={styles.practicesText}>Support for Your Journey</Text>
      </Text>

      {/* Category Buttons */}
      {topics.map((topic, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.card} 
          onPress={() => navigation.navigate(topic.screen)}
        >
          <ImageBackground 
            source={topic.image} 
            style={styles.cardImage} 
            imageStyle={{ borderRadius: 20 }}
          >
            <View style={styles.overlay}>
              <Text style={styles.cardText}>{topic.name}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#E5ECF4', 
    paddingHorizontal: 20, 
    paddingTop: 50 
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 15 
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
    height: 140, 
    borderRadius: 20, 
    marginBottom: 20, 
    overflow: 'hidden',
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 3 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 5 
  },
  cardImage: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Subtle dark overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#2C3539', 
    textTransform: 'uppercase', 
    textAlign: 'center',
    paddingHorizontal: 10
  }
});

export default HomeScreen;
