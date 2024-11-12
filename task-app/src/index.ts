import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { connectDB } from './utils/db';
import taskRoutes from './routes/taskRoutes'; // Ensure taskRoutes exports the router correctly

const app = express();

// Allow cross-origin requests from specific domains (localhost:5174 in your case)
const corsOptions = {
  origin: 'http://localhost:5173', // Frontend port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware setup
app.use(cors(corsOptions)); // Apply CORS middleware with the options
app.use(express.json()); // For parsing application/json

// MongoDB connection via connectDB function
connectDB(); // Assuming connectDB handles the MongoDB connection setup

// Use the routes defined in taskRoutes
app.use('/api', taskRoutes); // Use task routes under /api

// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
