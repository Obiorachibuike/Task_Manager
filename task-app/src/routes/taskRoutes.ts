import express, { Request, Response } from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskWithStreamingData,
} from '../Controllers/taskController'; // Ensure correct casing of your import

const router = express.Router();

// Get all tasks
router.get('/tasks', getTasks);

// Get a task by ID
router.get('/tasks/:id', getTaskById);

// Create a new task
router.post('/tasks', createTask);

// Update a task by ID
router.put('/tasks/:id', updateTask);

// Delete a task by ID
router.delete('/tasks/:id', deleteTask);

// Stream task data
router.get('/tasks/:id/streaming', getTaskWithStreamingData);

export default router;
