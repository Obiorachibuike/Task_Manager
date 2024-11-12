// src/App.tsx

import React, { useState } from "react";
// import {  useTaskContext } from './context/TaskContext';
import TaskForm from "./components/TaskForm.tsx";
import TaskList from "./components/TaskList.tsx";
import CategoriesSlider from "./components/CategoriesSlider.tsx";
import Header from "./components/Header.tsx";
import TaskInfo from "./components/TaskInfo.tsx";
import ToDo from "./components/ToDo.tsx";
import Task from "./utils/Task.js"
import ConfirmationModal from "./components/Modal.tsx";
import TaskModal from "./components/TaskModal.tsx";
import TaskProvider from "./context/TaskContext.tsx";
import HomePage from "./page/HomePage.tsx";
// import TodoProvider from "./context/TodoContext.tsx";

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("To Do");
  const [showModal, setShowModal] = useState(false);
  // const {}
  // const { tasks, addNewTask, updateExistingTask, deleteExistingTask, isLoading, error } = useTaskContext();
  // const { tasks, setTask } = useState([]);

  
   const handleAddTask = (task:any) => {
        Task.push(task)
        setShowModal(false)
   }
 


const Todo = Task.filter((b) => {
  return b.state == "to_do"
})
const Progress = Task.filter((b) => {
  return b.state == "progress"
})
const Completed = Task.filter((b) => {
  return b.state == "done"
})

  // const filteredTasks = tasks.filter((task) => task.status === selectedCategory);

  return (
    <div>
      {/* <TodoProvider > */}

      <Header />
      <TaskProvider>
  <HomePage />
      <div className="main_app_container">
        <div className="app_info">
          <div className="task_info_cont">
            <div className="task_info_content">
              {/* {
                taskInfo.map((e,index) => (
                  <div className="app_tracker-container" key={index}>
                    <TaskInfo name={e.status} image={e.image} count={e.total} task= {taskInfo} />
                    
                    </div>
                    ))
                    } */}
              {/* <TaskInfo taskInfo={taskInfo}/> */}
                    <TaskInfo name={Todo[1].status} image={Todo[1].image} count={5} length= {Todo.length} />
                    <TaskInfo name={Progress[1].status} image={Progress[1].image} count={Task.length} length= {Progress.length} />
                    <TaskInfo name={Completed[1].status} image={Completed[1].image} count={Completed.length} length= {Task.length} />
                  
             
            </div>
            <div className="add_task_btn_cont" onClick={() => setShowModal(true)}>
              <button>+ Add Task</button>
            </div>
          </div>


              

              {/* {
                Todo.map((b,index) => (
                  <div className="todo_cont completed"  key={index}>
                  
                    <ToDo color="todo_color blue" border=" todo-title-cont border-bottom" count={Todo.length} title = "To Do" />
                    </div>
                  
                    ))
              } */}

          <ToDo  status="to_do"/>

          <ToDo status="progress" />
          <ToDo status="done" />
        </div>
      </div>

      {/* <CategoriesSlider />

<TaskForm />
<CategoriesSlider />
<TaskList /> */}
      </TaskProvider>
      {/* </TodoProvider> */}
      {showModal && (
        <TaskModal
      
        onConfirm={handleAddTask}
        onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default App;
