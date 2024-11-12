"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./utils/db");
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes")); // Ensure taskRoutes exports the router correctly
const app = (0, express_1.default)();
// Allow cross-origin requests from specific domains (localhost:5174 in your case)
const corsOptions = {
    origin: 'http://localhost:5173', // Frontend port
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
// Middleware setup
app.use((0, cors_1.default)(corsOptions)); // Apply CORS middleware with the options
app.use(express_1.default.json()); // For parsing application/json
// MongoDB connection via connectDB function
(0, db_1.connectDB)(); // Assuming connectDB handles the MongoDB connection setup
// Use the routes defined in taskRoutes
app.use('/api', taskRoutes_1.default); // Use task routes under /api
// Start the server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
