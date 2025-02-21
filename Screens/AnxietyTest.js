import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const questions = [
  "I worry about things",
  "I anticipate the worst",
  "I cannot control my fears",
  "I am irritable",
  "I feel tense",
  "I get startled easily",
  "I break into tears without apparent reason",
  "I get tired quickly",
  "I am unable to relax",
  "I have racing thoughts",
  "My sleep is disturbed",
  "I do not wake up feeling rested",
  "I find it difficult to concentrate on tasks",
  "I can’t remember things",
  "I am fidgety",
  "My hands tremble",
  "I experience sudden chest pains or rapid heartbeat",
  "I feel like I cannot breathe or am breathing too fast",
  "My mouth goes dry",
  "I avoid certain places, activities, or situations"
];

const options = ["Never", "Rarely", "Sometimes", "Often", "Always"];

const AnxietyTest = () => {
  const [responses, setResponses] = useState(Array(questions.length).fill(null));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [previousScores, setPreviousScores] = useState([]);
  const [showPreviousScores, setShowPreviousScores] = useState(false);

  const handleSelect = (value) => {
    const newResponses = [...responses];
    newResponses[currentIndex] = value;
    setResponses(newResponses);
  };

  const calculateResult = () => {
    const score = responses.reduce((sum, response) => sum + (response !== null ? options.indexOf(response) : 0), 0);
    let level = "Mild Anxiety";
    if (score > 40) level = "Severe Anxiety";
    else if (score > 25) level = "Moderate Anxiety";

    setPreviousScores([...previousScores, { score, level }]);
    setResult({ level, score });
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#546C75' }}>
      {!result ? (
        <>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#F5F5F5' }}>
            Do You Feel Anxious?
          </Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#F5F5F5' }}>
            {questions[currentIndex]}
          </Text>
          <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={{
                  padding: 10,
                  marginVertical: 5,
                  width: 200,
                  backgroundColor: responses[currentIndex] === option ? '#546C75' : '#A7D8DE',
                  borderRadius: 5,
                  alignItems: 'center',
                }}
                onPress={() => handleSelect(option)}
              >
                <Text style={{ color: '#000', fontSize: 16 }}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            {currentIndex > 0 && (
              <TouchableOpacity
                style={{
                  backgroundColor: '#A7D8DE',
                  padding: 10,
                  borderRadius: 8,
                  width: 100,
                  alignItems: 'center',
                }}
                onPress={() => setCurrentIndex(currentIndex - 1)}
              >
                <Text style={{ color: '#000', fontSize: 16 }}>← Previous</Text>
              </TouchableOpacity>
            )}
            {currentIndex < questions.length - 1 ? (
              <TouchableOpacity
                style={{
                  backgroundColor: responses[currentIndex] !== null ? '#A7D8DE' : '#cccccc',
                  opacity: responses[currentIndex] !== null ? 1 : 0.7,
                  padding: 10,
                  borderRadius: 8,
                  width: 100,
                  alignItems: 'center',
                }}
                onPress={() => {
                  if (responses[currentIndex] !== null) {
                    setCurrentIndex(currentIndex + 1);
                  }
                }}
              >
                <Text style={{ color: '#000', fontSize: 16 }}>Next →</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: '#A7D8DE',
                  padding: 15,
                  borderRadius: 8,
                  marginTop: 20,
                  width: 150,
                  alignItems: 'center',
                }}
                onPress={calculateResult}
              >
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Submit</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#F5F5F5' }}>Your Anxiety Level:</Text>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#A7D8DE' }}>{result.level}</Text>
          <Text style={{ fontSize: 16, color: '#F5F5F5', marginTop: 5 }}>Score: {result.score}</Text>

          <TouchableOpacity
            style={{
              backgroundColor: '#A7D8DE',
              padding: 10,
              borderRadius: 8,
              marginTop: 20,
              width: 180,
              alignItems: 'center',
            }}
            onPress={() => setShowPreviousScores(!showPreviousScores)}
          >
            <Text style={{ color: '#000', fontSize: 16 }}>
              {showPreviousScores ? "Hide Previous Scores" : "View Previous Scores"}
            </Text>
          </TouchableOpacity>

          {showPreviousScores && (
            <ScrollView style={{ marginTop: 20, maxHeight: 150, width: '80%', backgroundColor: '#F5F5F5', padding: 10, borderRadius: 10 }}>
              {previousScores.length === 0 ? (
                <Text style={{ textAlign: 'center', color: '#000' }}>No previous scores available.</Text>
              ) : (
                previousScores.map((entry, index) => (
                  <Text key={index} style={{ color: '#000', fontSize: 16, marginBottom: 5 }}>
                    Attempt {index + 1}: {entry.level} (Score: {entry.score})
                  </Text>
                ))
              )}
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
};

export default AnxietyTest;