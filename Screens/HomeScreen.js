import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

const topics = [
  { name: "Anxiety", color: ['#D38312', '#A83279'], screen: "Anxiety" },
  { name: "Depression", color: ['#1E3C72', '#2A5298'], screen: "Depression" },
  { name: "Time Management", color: ['#4CA1AF', '#C4E0E5'], screen: "TimeManagement" },
  { name: "Mental Health Test", color: ['#D76D77', '#FFAF7B'], screen: "MentalHealthTest" }
];

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Find Support for Your Journey</Text>
      <View style={styles.listContainer}>
        {topics.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.button, { backgroundColor: item.color[0] }]}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Text style={styles.buttonText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#546C75', 
    paddingHorizontal: 20, 
    paddingTop: 50,
    alignItems: 'center'
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: 'white',
    marginBottom: 20
  },
  listContainer: {
    width: '100%',
    alignItems: 'center'
  },
  button: {
    width: '90%',
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  }
});

export default HomeScreen;
