// src/components/TaskList_Opt.tsx

import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList_Opt: React.FC = () => {
  const { tasks } = useTaskContext(); // Get the tasks from the context

  return (
    <div>
      <h2>Task List</h2>
      <div>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList_Opt;
