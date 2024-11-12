import React, { createContext, useState, useEffect, useContext } from "react";
import { getTasks, addTask, updateTask, deleteTask,fetchTaskWithStreamingData  } from '../api/api';
import axios, { AxiosError } from "axios";

// Define the structure of a Task
interface Task {
  id: string;
  title: string;
  description: string;
  deadline: Date; // Changed to Date type
  status: string;
}

// Define the shape of our Context
interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>; // Add setTasks to context type
  addNewTask: (task: Task) => void;
  editTask: (id: string, task: Task) => void;
  deleteTodoTask: (id: string) => void;
  fetchTaskDataWithStreaming: (id: string) => void;
  setStreamingLoading: React.Dispatch<React.SetStateAction<boolean>>;  // Correct type here
  loading: boolean;
  error: string | null;
}

// Create a Context with default values
const TaskContext = createContext<TaskContextType | undefined>(undefined);



// Create a provider component to manage global state
export const TaskProvider: React.FC = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false); // loading state
  const [error, setError] = useState<string | null>(null);
  const [streamingLoading, setStreamingLoading] = useState(false); // streaming loading state

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await getTasks();
        setTasks(response.map((task: any) => ({
          ...task,
          deadline: new Date(task.deadline) // Convert string to Date
        })));
      } catch (err) {
        setError("Error fetching tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task to the list
  const addNewTask = async (task: Task) => {
    setLoading(true);
    setError(null);
    try {
      const newTask = await addTask({
        ...task,
        deadline: task.deadline.toISOString() // Convert Date to string (ISO format) when sending to API
      });
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      setError("Failed to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Edit an existing task by updating its details
  const editTask = async (id: string, updatedTask: Task) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateTask(id, {
        ...updatedTask,
        deadline: updatedTask.deadline.toISOString() // Convert Date to string (ISO format)
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updated : task))
      );
    } catch (error) {
      setError("Failed to update task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a task from the list
  const deleteTodoTask = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      setError("Failed to delete task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch and update task data in real-time using streaming (you can call this function in a component)
  const fetchTaskDataWithStreaming = (taskId: string) => {
    fetchTaskWithStreamingData(taskId, (updatedTaskData: any) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTaskData.id ? { ...task, ...updatedTaskData } : task
        )
      );
    }, setStreamingLoading); // Pass setStreamingLoading function
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks, // Include setTasks in the context
        addNewTask,
        editTask,
        deleteTodoTask,
        loading,
        error,
        fetchTaskDataWithStreaming, // Add streaming function to the context
        streamingLoading // Pass streaming loading state to context
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to access the Task context
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export default TaskProvider;
