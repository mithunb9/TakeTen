import React, { useState } from 'react';
import ColumnComponent from '../../components/ColumnComponents'; // Import the new component

interface Task {
  id: number; // Unique identifier for each task
  name: string;
  timeToComplete: string;
  taskClass: string;
  dueDate: string;
}


const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
  {
    id: 1,
    name: 'Task 1',
    timeToComplete: '2 hours',
    taskClass: 'In Progress',
    dueDate: '2023-12-01',
  },
  {
    id: 2,
    name: 'Task 2',
    timeToComplete: '1 hour',
    taskClass: 'Not Started',
    dueDate: '2023-12-05',
  },
  {
    id: 3,
    name: 'Task 1',
    timeToComplete: '3 hours',
    taskClass: 'Not Started',
    dueDate: '2023-12-10',
},
{
    id: 4,
    name: 'Task 4',
    timeToComplete: '4 hours',
    taskClass: 'Not Started',
    dueDate: '2023-12-15',
},
  //add more sample tasks
  


  // ... other tasks
]);


  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task) => {
    e.dataTransfer.setData('application/json', JSON.stringify(task));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, newColumn: string) => {
  e.preventDefault();
  const droppedTask = JSON.parse(e.dataTransfer.getData('application/json'));

  // Remove the task from the old column
  const updatedTasks = tasks.filter((task) => task.id !== droppedTask.id);

  // Add the task to the new column
  setTasks([...updatedTasks, { ...droppedTask, taskClass: newColumn }]);
};


  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-red text-white">
      <div className="flex w-3/4">
        {/* Use the ColumnComponent for each column */}
        <ColumnComponent
          tasks={tasks}
          columnTitle="Not Started"
          onDrop={handleDrop}
          allowDrop={allowDrop}
          onDragStart={handleDragStart}
        />
        <ColumnComponent
          tasks={tasks}
          columnTitle="In Progress"
          onDrop={handleDrop}
          allowDrop={allowDrop}
          onDragStart={handleDragStart}
        />
        <ColumnComponent
          tasks={tasks}
          columnTitle="Done"
          onDrop={handleDrop}
          allowDrop={allowDrop}
          onDragStart={handleDragStart}
        />
      </div>
    </div>
  );
};

export default KanbanBoard;
