import React, { useState, useRef, useEffect } from "react";
import { useTaskContext } from "../context/TaskContext";
import ConfirmationModal from "./Modal";
import TaskModal from "./TaskModal"; 

function ToDo({ status }: { status: string }) {
  const { tasks, deleteTodoTask, editTask, setTasks } = useTaskContext();
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [modalState, setModalState] = useState<{
    showMore: boolean;
    showConfirm: boolean;
    action: "delete" | "update" | null;
  }>({ showMore: false, showConfirm: false, action: null });

  const moreContentRef = useRef<HTMLDivElement | null>(null); 
  const formRef = useRef<HTMLDivElement | null>(null); 

  const filteredTasks = tasks.filter((task) => task.status === status);

  const statusTitles = {
    undone: { title: "To Do", color: "blue" },
    progress: { title: "In Progress", color: "orange" },
    done: { title: "Completed", color: "green" },
  };

  const { title, color } = statusTitles[status] || { title: "", color: "gray" };

  // Close the more menu and form when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreContentRef.current &&
        !moreContentRef.current.contains(event.target as Node)
      ) {
        setModalState((prevState) => ({ ...prevState, showMore: false }));
      }

      if (
        formRef.current &&
        !formRef.current.contains(event.target as Node)
      ) {
        setModalState((prevState) => ({ ...prevState, showMore: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMore = (task: any) => {
    setSelectedTask(task);
    setModalState({ ...modalState, showMore: true });
  };

  const handleAction = (action: "delete" | "update") => {
    if (action === "update") {
      setModalState({ ...modalState, showMore: false, action: "update", showConfirm: true });
    } else {
      setModalState({ ...modalState, showMore: false, action, showConfirm: true });
    }
  };

  const confirmAction = () => {
    if (modalState.action === "delete" && selectedTask) {
      deleteTodoTask(selectedTask._id);
      const updatedTasks = tasks.filter((task) => task._id !== selectedTask._id);
      setTasks(updatedTasks);
    } else if (modalState.action === "update" && selectedTask) {
      editTask(selectedTask.id, selectedTask);
    }
    setModalState({ showMore: false, showConfirm: false, action: null });
  };

  const handleUpdateTaskDetails = (taskDetails: any) => {
    setSelectedTask(taskDetails);
    setModalState({ ...modalState, showConfirm: false, action: null });
  };

  return (
    <div className={`todo_cont ${status}`}>
      <div className="todo_content">
        <div className="todo-title-cont">
          <div className="todo_title-content">
            <div className="todo_title">
              <div className={`todo_color ${color}`} />
              <div className="todo_status">{title}</div>
              <div className="todo_length">{filteredTasks.length}</div>
            </div>
          </div>
        </div>

        {filteredTasks.map((task, index) => (
          <div className="todo_list_cont" key={task._id}>
            <div className="todo_list_content">
              <div className="todo_head_cont">
                <div className="todo_head_content">
                  <div className="todo_head_detail">
                    <div className="todo_state">Low</div>
                    <div className="todo_name">{task.title}</div>
                  </div>
                  <div className="todo_more_cont">
                    <div className="todo_more" onClick={() => handleMore(task)}>
                      ...
                    </div>
                  </div>
                </div>

                {modalState.showMore && selectedTask === task && (
                  <div className="more-cont" ref={moreContentRef}>
                    <div className="more-content">
                      <button onClick={() => handleAction("delete")}>Delete</button>
                      <button onClick={() => handleAction("update")}>Update</button>
                    </div>
                  </div>
                )}

                {modalState.showConfirm && selectedTask === task && modalState.action && (
                  <div className={`confirm-${modalState.action}`}>
                    <ConfirmationModal
                      message={`Are you sure you want to ${modalState.action} this task?`}
                      onConfirm={confirmAction}
                      onCancel={() => setModalState({ ...modalState, showConfirm: false })}
                    />
                  </div>
                )}

                {modalState.showConfirm && selectedTask && modalState.action === "update" && (
                  <div ref={formRef}> 
                    <TaskModal 
                      task={selectedTask} 
                      onUpdate={handleUpdateTaskDetails} 
                      onCancel={() => setModalState({ ...modalState, showConfirm: false })}
                    />
                  </div>
                )}
              </div>

              <div className="todo_body_cont">
                <div className="todo_body_content">
                  <p>{task.description}</p>
                </div>
              </div>
              <div className="todo_deadline_cont">
                <div className="todo_deadline">
                  <span>Deadline:</span>
                  <span>{task.deadline ? new Date(task.deadline).toLocaleDateString() : "No deadline"}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToDo;
