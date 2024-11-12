import React, { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm.tsx";
import TaskList from "../components/TaskList.tsx";
import CategoriesSlider from "./components/CategoriesSlider.tsx";
import Header from "./components/Header.tsx";
import TaskInfo from "../components/TaskInfo.tsx";
import ToDo from "../components/ToDo.tsx";
import ConfirmationModal from "../components/Modal.tsx";
import TaskModal from "../components/TaskModal.tsx";
import { useTaskContext } from "../context/TaskContext.tsx";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("To Do");
  const [showModal, setShowModal] = useState(false);
  const { tasks, addNewTask } = useTaskContext();

  // Handle adding a new task
  const handleAddTask = (task: any) => {
    addNewTask(task);
    setShowModal(false);
  };

  // Filter tasks based on their state
  const Todo = tasks.filter((task) => task.status === "undone");
  const Progress = tasks.filter((task) => task.status === "progress");
  const Completed = tasks.filter((task) => task.status === "done");

  return (
    <div>
      <div className="main_app_container">
        <div className="app_info">
          <div className="task_info_cont">
            <div className="task_info_content">
              {/* Dynamically displaying task information */}
              <TaskInfo 
                name="To Do" 
                image={Todo[0]?.image || ""} 
                count={Todo.length} 
                length={Todo.length} 
              />
              <TaskInfo 
                name="In Progress" 
                image={Progress[0]?.image || ""} 
                count={Progress.length} 
                length={Progress.length} 
              />
              <TaskInfo 
                name="Completed" 
                image={Completed[0]?.image || ""} 
                count={Completed.length} 
                length={Completed.length} 
              />
            </div>
            <div className="add_task_btn_cont" onClick={() => setShowModal(true)}>
              <button>+ Add Task</button>
            </div>
          </div>

          {/* ToDo, Progress, and Completed task components */}
          <ToDo status="undone" tasks={Todo} />
          <ToDo status="progress" tasks={Progress} />
          <ToDo status="done" tasks={Completed} />
        </div>
      </div>

      {/* Show modal for adding a task */}
      {showModal && (
        <TaskModal
          onConfirm={handleAddTask}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default HomePage;
