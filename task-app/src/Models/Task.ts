import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the task
interface ITask extends Document {
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  deadline: Date;
}

// Define the schema for the task model
const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  deadline: { type: Date, required: true },
});

// Export the task model using ES module
const Task = mongoose.model<ITask>('Task', taskSchema);
export { Task };
