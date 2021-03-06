import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskFound = tasks.find(task => task.title === newTaskTitle);
    if (!taskFound) {
      if (newTaskTitle !== "") {
        setTasks([...tasks, {
          id: Math.floor(Math.random() * 10000),
          title: newTaskTitle,
          done: false
        }]);
      }
    } else {
      Alert.alert(
        "Task já cadastrada", 
        "Você não pode cadastrar uma task com o mesmo nome"
      )
    }
  }

  function handleToggleTaskDone(id: number) {
    const newTasks = [...tasks];
    newTasks.forEach(task => {
      if (task.id === id) {        
        task.done = !task.done;
      }
    });

    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    const newTasks = tasks.filter(task => task.id !== id);

    setTasks(newTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})