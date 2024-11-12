"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../Controllers/taskController"); // Ensure correct casing of your import
const router = express_1.default.Router();
// Get all tasks
router.get('/tasks', taskController_1.getTasks);
// Get a task by ID
router.get('/tasks/:id', taskController_1.getTaskById);
// Create a new task
router.post('/tasks', taskController_1.createTask);
// Update a task by ID
router.put('/tasks/:id', taskController_1.updateTask);
// Delete a task by ID
router.delete('/tasks/:id', taskController_1.deleteTask);
// Stream task data
router.get('/tasks/:id/streaming', taskController_1.getTaskWithStreamingData);
exports.default = router;
