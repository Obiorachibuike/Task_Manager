import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import ConfirmationModal from './Modal.tsx';

const TaskItem = ({ task }) => {
  const { deleteTask,editTask } = useTaskContext();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    deleteTask(task.id);  // Call the delete function
    setShowModal(false);   // Close the modal
  };

  const handleUpdate = () => {
       editTask(task.id,  { ...task, status: 'In Progress' })
  }

  return (
    <div>
      <div>{task.title}</div>
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <p>Status: {task.status}</p>
      <button onClick={() => handleUpdate}>Start</button>
    
      <button onClick={() => setShowModal(true)}>Delete</button>

      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this task?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default TaskItem;
