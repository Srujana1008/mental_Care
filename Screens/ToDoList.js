import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Platform 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);
  const [task, setTask] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const storedFinishedTasks = await AsyncStorage.getItem('finishedTasks');
      if (storedTasks) setTasks(JSON.parse(storedTasks));
      if (storedFinishedTasks) setFinishedTasks(JSON.parse(storedFinishedTasks));
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTasks = async (newTasks, newFinishedTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
      await AsyncStorage.setItem('finishedTasks', JSON.stringify(newFinishedTasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const addTask = () => {
    if (!task.trim()) {
      Alert.alert('Error', 'Task cannot be empty');
      return;
    }
    const newTask = { 
      id: Date.now().toString(), 
      title: task, 
      date: date.toDateString(),
      completed: false 
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks, finishedTasks);
    setTask('');
  };

  const finishTask = (taskId) => {
    const taskToMove = tasks.find(task => task.id === taskId);
    if (!taskToMove) return;

    const updatedTasks = tasks.filter(task => task.id !== taskId);
    const updatedFinishedTasks = [...finishedTasks, taskToMove];

    setTasks(updatedTasks);
    setFinishedTasks(updatedFinishedTasks);
    saveTasks(updatedTasks, updatedFinishedTasks);
  };

  const onDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ To-Do List</Text>

      {/* Date Picker */}
      <TouchableOpacity 
        style={styles.dateButton} 
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.buttonText}>📅 Select Date</Text>
      </TouchableOpacity>

      {showDatePicker && (
        Platform.OS === 'android' ? (
          <DateTimePicker
            value={date}
            mode="date"
            display="calendar"
            onChange={onDateChange}
          />
        ) : (
          <View style={styles.iosDateContainer}>
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
            <TouchableOpacity 
              style={styles.doneButton} 
              onPress={() => setShowDatePicker(false)}
            >
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        )
      )}

      <Text style={styles.selectedDate}>Selected Date: {date.toDateString()}</Text>

      {/* Task Input */}
      <TextInput 
        style={styles.input} 
        placeholder="Enter task..." 
        value={task} 
        onChangeText={setTask}
      />

      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.buttonText}>➕ Add Task</Text>
      </TouchableOpacity>

      {/* Active Task List */}
      <Text style={styles.sectionTitle}>📌 Tasks</Text>
      <FlatList 
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.taskItem} 
            onPress={() => finishTask(item.id)}
          >
            <Text style={styles.taskText}>
              {item.date} - {item.title}
            </Text>
            <Text style={styles.checkbox}>✔️</Text>
          </TouchableOpacity>
        )}
      />

      {/* Finished Task List */}
      <Text style={styles.sectionTitle}>🎉 Finished Tasks</Text>
      <FlatList 
        data={finishedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.finishedTaskItem}>
            <Text style={styles.taskText}>
              {item.date} - {item.title}
            </Text>
            <Text style={styles.finishedCheck}>✅</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  input: { 
    borderWidth: 1, padding: 10, borderRadius: 8, marginBottom: 10, backgroundColor: '#fff' 
  },
  dateButton: { 
    backgroundColor: '#FFA500', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 10 
  },
  selectedDate: { textAlign: 'center', fontSize: 16, marginBottom: 10 },
  addButton: { 
    backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 10 
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  taskItem: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 15, backgroundColor: '#fff', borderRadius: 8, marginVertical: 5, elevation: 2 
  },
  finishedTaskItem: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 15, backgroundColor: '#D4EDDA', borderRadius: 8, marginVertical: 5, elevation: 2 
  },
  taskText: { fontSize: 16, flex: 1 },
  checkbox: { fontSize: 20, marginLeft: 10, color: '#007AFF' },
  finishedCheck: { fontSize: 20, marginLeft: 10, color: '#28A745' },
  iosDateContainer: { alignItems: 'center', marginBottom: 10 },
  doneButton: { 
    backgroundColor: '#007AFF', padding: 10, borderRadius: 5, marginTop: 10, alignItems: 'center' 
  }
});

export default ToDoList;
