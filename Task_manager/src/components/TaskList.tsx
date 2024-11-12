import React, { useState } from "react";
// import { useTaskContext } from "../context/TaskContext.tsx";
import TaskItem from "./TaskItem.tsx";

const TaskList:React.FC = () => {
  // const { tasks, loading, error } = useTaskContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [tasks, setTask] = useState([]);
  const [loading, setLoading] = useState(1);
  const [error, setError] = useState(1);
  const tasksPerPage = 5;
  const lastIndex = currentPage * tasksPerPage;
  const firstIndex = lastIndex - tasksPerPage;
  const currentTasks = tasks.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  if (loading) {
    return <div>Loading tasks...</div>; // Show a loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message if any
  }

  return (
    <div>
       <h2>Task List</h2>
      {currentTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}

      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;
