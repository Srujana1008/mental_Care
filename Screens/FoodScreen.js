import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const foodRecommendations = [
  { category: "Magnesium-Rich Foods", emoji: "🌿", items: "Dark Chocolate 🍫, Spinach, Almonds, Bananas 🍌" },
  { category: "Omega-3 Fatty Acids", emoji: "🐟", items: "Salmon, Chia Seeds, Walnuts" },
  { category: "Complex Carbohydrates", emoji: "🍠", items: "Oats, Quinoa, Brown Rice, Sweet Potatoes" },
  { category: "Probiotic & Fermented Foods", emoji: "🦠", items: "Yogurt, Kefir, Kimchi, Sauerkraut, Miso" },
  { category: "Tryptophan-Rich Foods", emoji: "🥚", items: "Turkey, Chicken, Eggs, Cheese" },
  { category: "Vitamin B-Complex Foods", emoji: "🥑", items: "Avocados, Legumes, Whole Grains" },
  { category: "Herbal Teas", emoji: "🍵", items: "Chamomile Tea, Green Tea, Peppermint Tea" },
  { category: "Hydrating Foods", emoji: "💧", items: "Cucumbers, Watermelon 🍉, Oranges 🍊" },
  { category: "Foods to Avoid", emoji: "🚫", items: "Caffeine ☕, Processed Sugary Foods 🍩, Alcohol 🍷, Fried & Junk Foods 🍟" },
];

const FoodScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🥗 Best Foods for Anxiety</Text>
      <FlatList
        data={foodRecommendations}
        keyExtractor={(item) => item.category}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.emoji} {item.category}</Text>
            <Text style={styles.cardText}>{item.items}</Text>
          </View>
        )}
      />

      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>⬅️ Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF6F6', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 15, color: '#004D40' },
  card: { backgroundColor: '#FFFFFF', padding: 15, borderRadius: 10, marginBottom: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#00796B' },
  cardText: { fontSize: 16, color: '#333', marginTop: 5 },
  avoidTitle: { fontSize: 20, fontWeight: 'bold', color: '#D32F2F', marginTop: 20, textAlign: 'center' },
  avoidText: { fontSize: 16, textAlign: 'center', color: '#444', marginTop: 5 },
  backButton: { marginTop: 20, alignSelf: 'center', backgroundColor: '#007AFF', padding: 10, borderRadius: 8, width: '50%', alignItems: 'center' },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

export default FoodScreen;
