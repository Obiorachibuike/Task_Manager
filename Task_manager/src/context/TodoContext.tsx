import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { getTasks, addTask, updateTask, deleteTask } from '../api/api';

export const TodoContext = createContext();

// Custom hook to access the Task context
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false); // loading state
  const [error, setError] = useState(null);

 // Fetch tasks from the API
 useEffect(() => {
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (err) {
      setError("Error fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  fetchTasks();
}, []);




  // Add a new task to the list
  const addNewTask = async (task) => {
    setLoading(true);
    setError(null);
    try {
      const newTask = await addTask(task);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      setError("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  // Edit an existing task by updating its details
  const editTask = async (id, updatedTask) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateTask(id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updated : task))
      );
    } catch (error) {
      setError('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  // Delete a task from the list
  const deleteTodoTask = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      setError('Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TodoContext.Provider value={{ tasks, addNewTask, editTask, deleteTodoTask, loading, error  }}>
      {children}
    </TodoContext.Provider>
  );
};

