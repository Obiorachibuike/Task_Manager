"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskWithStreamingData = exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskById = exports.getTasks = void 0;
const Task_1 = require("../Models/Task");
// Fetch all tasks and update their status based on the deadline
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_1.Task.find();
        const currentDate = new Date(); // Get the current date
        // Iterate over each task and check its deadline
        const updatedTasks = yield Promise.all(tasks.map((task) => __awaiter(void 0, void 0, void 0, function* () {
            const taskDeadline = new Date(task.deadline); // Assuming task.deadline is a Date field
            if (currentDate.toDateString() === taskDeadline.toDateString()) {
                // If the current date is equal to the deadline, set status to "On Progress"
                if (task.status !== 'On Progress') {
                    task.status = 'On Progress';
                    yield task.save(); // Save the updated task
                }
            }
            else if (currentDate > taskDeadline) {
                // If the current date is past the deadline, set status to "Expired"
                if (task.status !== 'Expired') {
                    task.status = 'Expired';
                    yield task.save(); // Save the updated task
                }
            }
            return task; // Return the task (whether updated or not)
        })));
        res.status(200).json(updatedTasks); // Send the updated list of tasks
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
});
exports.getTasks = getTasks;
// Fetch task by ID
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const task = yield Task_1.Task.findById(id);
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
        }
        else {
            res.status(200).json(task);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching task', error });
    }
});
exports.getTaskById = getTaskById;
// Create a new task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status } = req.body;
    try {
        const newTask = new Task_1.Task({ title, description, status });
        yield newTask.save();
        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating task', error });
    }
});
exports.createTask = createTask;
// Update task by ID
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
        const updatedTask = yield Task_1.Task.findByIdAndUpdate(id, { title, description, status }, { new: true });
        if (!updatedTask) {
            res.status(404).json({ message: 'Task not found' });
        }
        else {
            res.status(200).json(updatedTask);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
});
exports.updateTask = updateTask;
// Delete task by ID
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedTask = yield Task_1.Task.findByIdAndDelete(id);
        if (!deletedTask) {
            res.status(404).json({ message: 'Task not found' });
        }
        else {
            res.status(200).json({ message: 'Task deleted successfully' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
});
exports.deleteTask = deleteTask;
// Fetch task with streaming data
// Example function to simulate streaming data for a task
const getTaskWithStreamingData = (req, res) => {
    const taskId = req.params.id; // Get task id from URL parameter
    // Mock streaming logic: For the sake of this example, we simulate streaming data
    const taskStream = setInterval(() => {
        // Fetch task details from database or other sources
        Task_1.Task.findById(taskId, (err, task) => {
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
exports.getTaskWithStreamingData = getTaskWithStreamingData;
