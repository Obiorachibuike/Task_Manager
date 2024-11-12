import React, { useState, useRef } from "react";
import { useTaskContext } from "../context/TaskContext"; // Import the context

// Define the structure of a Task
interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "Undone" | "In Progress" | "Completed"; // Updated status types
}

interface TaskFormProps {
  taskToEdit?: Task; // Optional Task object if editing an existing task
  onConfirm: () => void; // Callback to be triggered after form submission
}

const TaskForm: React.FC<TaskFormProps> = ({ taskToEdit, onConfirm }) => {
  // State management for form fields
  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : "");
  const [description, setDescription] = useState(
    taskToEdit ? taskToEdit.description : ""
  );
  const [dueDate, setDueDate] = useState(taskToEdit ? taskToEdit.dueDate : "");
  const [status, setStatus] = useState<Task["status"]>(
    taskToEdit ? taskToEdit.status : "Undone" // Default status to "Undone" for new tasks
  );
  const [errors, setErrors] = useState<string[]>([]);

  // Ref to the hidden date input
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Access addNewTask and editTask from the context
  const { addNewTask, editTask } = useTaskContext();

  // Form validation
  const validateForm = () => {
    const newErrors: string[] = [];

    if (!title || title.length < 3) {
      newErrors.push("Title is required and must be at least 3 characters long");
    }

    if (!description || description.length > 200) {
      newErrors.push("Description must be less than 200 characters");
    }

    if (!dueDate) {
      newErrors.push("Due date is required");
    } else {
      const currentDate = new Date();
      const taskDate = new Date(dueDate);
      if (taskDate.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)) {
        newErrors.push("Due date cannot be in the past");
      }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const updatedTask: Omit<Task, "id"> = {
        title,
        description,
        dueDate,
        status,
      };

      if (taskToEdit) {
        // If editing, send the id and the updated task
        editTask(taskToEdit.id, updatedTask);
      } else {
        // If adding a new task
        addNewTask(updatedTask);
      }

      // Clear the form fields after submission
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("Undone"); // Reset the status for new tasks
      setErrors([]);

      // Trigger the onConfirm callback (e.g., to close a modal)
      onConfirm();
    }
  };

  // Handle date selection
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  // Trigger date input click
  const handleDateClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.focus(); // Focus the input before triggering the click
      dateInputRef.current.click();  // Trigger the date picker
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="title">
        <h1>{taskToEdit ? "Edit Task" : "Add Task"}</h1>
      </div>

      {/* Display error messages */}
      {errors.length > 0 && (
        <div className="error-messages">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Task Title */}
      <label htmlFor="title">Task Title</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
      />

      {/* Task Description */}
      <label htmlFor="description">Task Description</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        required
      />

      {/* Task Status (only shown when editing) */}
      {taskToEdit && (
        <>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Task["status"])}
          >
            <option value="Undone">Undone</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </>
      )}

      {/* Button to trigger the date picker */}
      <div className="form_button_cont">
        <div className="deadline" onClick={handleDateClick}>
          Deadline
        </div>

        {/* Hidden Date Input (triggered by button) */}
        <input
          type="date"
          ref={dateInputRef}
          style={{
            visibility: "hidden", // Make it hidden but still interactable
            position: "absolute", // Avoid layout issues
          }}
          value={dueDate} // Ensure the selected date is bound to state
          onChange={handleDateChange} // Update state when the date is selected
          // required
        />

        {/* Submit Button */}
        <button type="submit" disabled={errors.length > 0}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
