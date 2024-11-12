import React, { useState, useRef, useEffect } from 'react';
import TaskForm from './TaskForm';
import "../styles/TaskModal.css";

interface TaskModalProps {
  onConfirm: (task: any) => void;
  onCancel: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ onConfirm, onCancel }) => {
  const modalRef = useRef<HTMLDivElement | null>(null); // Ref for the modal container

  // Detect focus-out
  useEffect(() => {
    const handleFocusOut = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        // Automatically close modal when focus is lost (click outside modal)
        onCancel(); 
      }
    };

    document.addEventListener("mousedown", handleFocusOut);
    return () => {
      document.removeEventListener("mousedown", handleFocusOut);
    };
  }, [onCancel]);

  return (
    <div className="modal" ref={modalRef}>
      <div className="modal-content">
        <TaskForm onConfirm={onConfirm} />
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default TaskModal;
