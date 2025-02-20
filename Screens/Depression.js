import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Depression = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Managing Depression</Text>
      <Text style={styles.subtitle}>Select an option to explore:</Text>

      {/* Tips */}
      <TouchableOpacity 
              style={styles.button} 
              onPress={() => navigation.navigate('Take Test')}>
              <Text style={styles.buttonText}>📝 Take Test</Text>
            </TouchableOpacity>
            <TouchableOpacity 
  style={styles.button} 
  onPress={() => navigation.navigate('DepressionTips')}>
  <Text style={styles.buttonText}>📌 Tips</Text>
</TouchableOpacity>

      {/* Watch Related Videos */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('DepressionVideos')}>
        <Text style={styles.buttonText}>🎥 Watch Related Videos</Text>
      </TouchableOpacity>

      {/* Food Recommendations */}
      <TouchableOpacity 
  style={styles.button} 
  onPress={() => navigation.navigate('DepressionFood')}>
  <Text style={styles.buttonText}>🥗 Food Recommendations</Text>
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 20, color: 'gray' },
  button: { backgroundColor: '#007AFF', padding: 15, margin: 10, borderRadius: 8, width: '80%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

export default Depression;