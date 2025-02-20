import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mental Wellness Topics</Text>

      {/* Anxiety */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Anxiety')}>
        <Text style={styles.buttonText}>Anxiety</Text>
      </TouchableOpacity>

      {/* Depression */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Depression')}>
        <Text style={styles.buttonText}>Depression</Text>
      </TouchableOpacity>

      {/* Time Management */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('TimeManagement')}>
        <Text style={styles.buttonText}>Time Management</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#007AFF', padding: 15, margin: 10, borderRadius: 8, width: '80%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

export default HomeScreen;