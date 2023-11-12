import React, { useState } from 'react';
import ColumnComponent from '../../components/ColumnComponents'; // Import the new component
import {AiOutlinePlus} from 'react-icons/ai';

interface Task {
  id: number; // Unique identifier for each task
  name: string;
  timeToComplete: string;
  progress: string;
  dueDate: string;
  grouping: string;
}



const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      name: 'Task 1',
      timeToComplete: '2 hours',
      progress: 'In Progress',
      dueDate: '2023-12-01',
      grouping: 'Group 1',
    },
    {
      id: 2,
      name: 'Task 2',
      timeToComplete: '1 hour',
      progress: 'Not Started',
      dueDate: '2023-12-05',
      grouping: 'Group 1',
    },
    {
      id: 3,
      name: 'Task 1',
      timeToComplete: '3 hours',
      progress: 'Not Started',
      dueDate: '2023-12-10',
      grouping: 'Group 2',
    },
    {
      id: 4,
      name: 'Task 4',
      timeToComplete: '4 hours',
      progress: 'Not Started',
      dueDate: '2023-12-15',
      grouping: 'Group 2',
    },
    //add more sample tasks
  ]);

  const addTask = () => {
    // Generate a new task with a unique id and default values
    const newTask: Task = {
      id: tasks.length + 1, // This assumes tasks are never deleted
      name: 'New Task',
      timeToComplete: '1 hour',
      progress: 'Not Started',
      dueDate: '2023-12-31',
      grouping: 'Group 1',
    }; // alter this to make a post request to the backend to add a new task

    // Add the new task to the current state
    setTasks([...tasks, newTask]);
  };


  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task) => {
    e.dataTransfer.setData('application/json', JSON.stringify(task));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, newColumn: string) => {
  e.preventDefault();
  const droppedTask = JSON.parse(e.dataTransfer.getData('application/json'));

  // Remove the task from the old column
  const updatedTasks = tasks.filter((task) => task.id !== droppedTask.id);

  // Add the task to the new column
  setTasks([...updatedTasks, { ...droppedTask, progress: newColumn }]);
};


  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <>
    <div className="flex flex-col justify-center items-center h-[80vh] mt-[5vh] text-white">
      <div className="flex flex-row w-[90%]">
        {/* Use the ColumnComponent for each column */}
        <ColumnComponent
          tasks={tasks}
          columnTitle="Not Started"
          onDrop={handleDrop}
          allowDrop={allowDrop}
          onDragStart={handleDragStart}
        />
        <div className='w-0.25 h-[100%] border border-black'/>
        <ColumnComponent
          tasks={tasks}
          columnTitle="In Progress"
          onDrop={handleDrop}
          allowDrop={allowDrop}
          onDragStart={handleDragStart}
        />
        <div className='w-0.25 h-[100%] border border-black'/>

        <ColumnComponent
          tasks={tasks}
          columnTitle="Done"
          onDrop={handleDrop}
          allowDrop={allowDrop}
          onDragStart={handleDragStart}
        />
      </div>
      <div className='w-[90vw] flex justify-end items-center h-[10vh]'>
        <button className=' bg-[#ffffff29] rounded-full h-16 flex items-center justify-center w-16 gap-[2%] hover:bg-[#424cb7] hover:text-white hover:delay-150 text-black text-4xl px-5' onClick={addTask}><AiOutlinePlus/></button>
      </div>
      

    </div>
    
    </>
);
};

export default KanbanBoard;
