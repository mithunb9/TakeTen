import React from 'react';
import {FaDotCircle} from 'react-icons/fa';

interface Task {
  id: number; // Unique identifier for each task
  name: string;
  timeToComplete: string;
  taskClass: string;
  dueDate: string;
}

interface ColumnProps {
tasks: Task[];
columnTitle: string;
onDrop: (e: React.DragEvent<HTMLDivElement>, newColumn: string) => void;
allowDrop: (e: React.DragEvent<HTMLDivElement>) => void;
onDragStart: (e: React.DragEvent<HTMLDivElement>, task: Task) => void;
}

const ColumnComponent: React.FC<ColumnProps> = ({
tasks,
columnTitle,
onDrop,
allowDrop,
onDragStart,
}) => {
return (
    <div className="w-1/3 p-4 h-[60vh] ">
    <h2 className="text-4xl font-bold mb-4 mx-[5%]">{columnTitle}</h2>
    <div
        className="bg-gray-800 overflow-y-auto   rounded-lg border-2 border-gray-700 h-[90%] mx-[5%]"
        onDrop={(e) => onDrop(e, columnTitle)}
        onDragOver={(e) => allowDrop(e)}
    >
        {tasks
        .filter((task) => task.taskClass === columnTitle)
        .map((task) => (
            <div
            key={task.name}
            className="bg-gray-700 p-[5%] m-[5%] h-[35%] w-[90%] rounded-xl cursor-move flex flex-col justify-center items-center"
            draggable
            onDragStart={(e) => onDragStart(e, task)}
            >
            <div className='w-[90%] flex flex-row justify-between'>
                <h1 className='text-4xl '>{task.name}</h1>
                <button className=' bg-[#ffffff51] px-5 h-8 flex flex-col justify-center rounded-full items-center'>  {columnTitle}</button>   

            </div>
            <div className='flex flex-row w-[90%] h-[20%] justify-evenly item-center ml-[-5%] gap-[10%] mt-[10%]' >

                <button className='rounded-lg bg-[#ff00006b]  px-5 flex flex-col justify-center  items-center'>{task.timeToComplete}</button>
                <button className='rounded-lg bg-[#00a2ff86]  px-5 flex flex-col justify-center  items-center'>{task.dueDate}</button>
                <button className='rounded-lg bg-[#33ff006b]  px-5 flex flex-col justify-center  items-center'>{task.taskClass}</button>
            </div>
            </div>
        ))}
    </div>
    </div>
);
};

export default ColumnComponent;
