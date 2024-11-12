import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your actual API endpoint

// Define the structure for the task
interface Task {
  id?: string; // Optional because it may not be present when adding a new task
  title: string;
  description: string;
  status?: string;
  deadline?: string;
}

// Define the structure for the response data
interface ResponseData {
  message?: string;
  data?: any; // You can specify more detailed types here based on your API's response
}

// Helper function to handle errors and return response.data
const handleError = (error: AxiosError): ResponseData => {
  // If there is an error with response data, return it, otherwise default to the message.
  return { message: error.response?.data || error.message || 'Something went wrong' };
};

// Fetch all tasks
export const getTasks = async (): Promise<any> => {
  try {
    // Check if tasks exist in local storage
    const cachedTasks = localStorage.getItem('tasks');
    if (cachedTasks) {
      // If tasks are found in local storage, parse and return them
      return JSON.parse(cachedTasks);
    }

    // If tasks are not found in local storage, fetch from the API
    const response = await axios.get(`${API_URL}/tasks`);
    const tasks = response.data;

    // Store the fetched tasks in local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Return the fetched tasks
    return tasks;
  } catch (error: AxiosError) {
    return handleError(error); // Return the error response data
  }
};


// Add a new task
export const addTask = async (task: Task): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task);
    console.log(response);
    console.log(task);
    
    return response.data; // Return the response data directly
  } catch (error: AxiosError) {
    return handleError(error); // Return the error response data
  }
};

// Update an existing task
export const updateTask = async (task: Task): Promise<any> => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${task.id}`, task);
    return response.data; // Return the response data directly
  } catch (error: AxiosError) {
    return handleError(error); // Return the error response data
  }
};

// Delete a task
export const deleteTask = async (id: string): Promise<any> => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${id}`);
    console.log(response);
    
    return response.data; // Return the response data directly
  } catch (error: AxiosError) {
    return handleError(error); // Return the error response data
  }
};

// Fetch task with streaming data
export const fetchTaskWithStreamingData = async (taskId: string): Promise<void> => {
  try {
    const response = await axios.get(`${API_URL}/tasks/${taskId}/streaming`, {
      responseType: 'stream', // Ensures we're handling streaming data
    });

    response.data.on('data', (chunk: Buffer) => {
      const data = JSON.parse(chunk.toString()); // Parse the streamed chunk
      console.log('Received task data:', data);
    });

    response.data.on('end', () => {
      console.log('Stream ended');
    });
  } catch (error: AxiosError) {
    console.error('Error fetching task with streaming data:', handleError(error)); // Handle errors
  }
};
