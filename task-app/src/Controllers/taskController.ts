import { Request, Response } from 'express';
import { Task } from '../Models/Task';
import { fetchStreamingData } from '../services/streamingService';

// Fetch all tasks and update their status based on the deadline
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find();
    const currentDate = new Date(); // Get the current date

    // Iterate over each task and check its deadline
    const updatedTasks = await Promise.all(
      tasks.map(async (task) => {
        const taskDeadline = new Date(task.deadline); // Assuming task.deadline is a Date field

        if (currentDate.toDateString() === taskDeadline.toDateString()) {
          // If the current date is equal to the deadline, set status to "On Progress"
          if (task.status !== 'On Progress') {
            task.status = 'On Progress';
            await task.save(); // Save the updated task
          }
        } else if (currentDate > taskDeadline) {
          // If the current date is past the deadline, set status to "Expired"
          if (task.status !== 'Expired') {
            task.status = 'Expired';
            await task.save(); // Save the updated task
          }
        }
        return task; // Return the task (whether updated or not)
      })
    );

    res.status(200).json(updatedTasks); // Send the updated list of tasks
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

// Fetch task by ID
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
    } else {
      res.status(200).json(task);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error });
  }
};

// Create a new task
export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { title, description, status } = req.body;
  try {
    const newTask = new Task({ title, description, status });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task', error });
  }
};

// Update task by ID
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { title, description, status }, { new: true });
    if (!updatedTask) {
      res.status(404).json({ message: 'Task not found' });
    } else {
      res.status(200).json(updatedTask);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

// Delete task by ID
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      res.status(404).json({ message: 'Task not found' });
    } else {
      res.status(200).json({ message: 'Task deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};

// Fetch task with streaming data
// Example function to simulate streaming data for a task
export const getTaskWithStreamingData = (req: Request, res: Response) => {
  const taskId = req.params.id; // Get task id from URL parameter

  // Mock streaming logic: For the sake of this example, we simulate streaming data
  const taskStream = setInterval(() => {
    // Fetch task details from database or other sources
    Task.findById(taskId, (err:Error, task:any) => {
      if (err || !task) {
        clearInterval(taskStream);
        res.status(500).send({ message: 'Error fetching task data' });
        return;
      }

      // Stream the task data to the client
      res.write(JSON.stringify(task)); // Send task data in chunks (streaming)

      // Simulate a real-time update by sending data every few seconds
      if (new Date().getSeconds() % 10 === 0) {
        res.write(JSON.stringify({ message: 'Real-time update', timestamp: new Date() }));
      }
    });
  }, 2000); // Stream data every 2 seconds (you can adjust this interval as needed)

  // End the stream after 30 seconds (simulating the end of the stream)
  setTimeout(() => {
    clearInterval(taskStream);
    res.end();
  }, 30000); // Stream ends after 30 seconds
};

