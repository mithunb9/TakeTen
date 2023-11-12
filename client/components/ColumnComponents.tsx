import React from "react";
import { FaDotCircle } from "react-icons/fa";
interface Task {
  id: number; // Unique identifier for each task
  name: string;
  timeToComplete: string;
  progress: string;
  dueDate: string;
  grouping: string;
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
  color,
}) => {
  return (
    <div className="w-[35vw] p-4 h-[70vh] text-black mx-auto">
      <div className="flex flex-row items-center">
        <div className={"rounded-lg w-1/2 h-12 text-center " + color}>
          <h2 className="text-4xl font-bold mb-4 mx-[5%]">{columnTitle}</h2>
        </div>
      </div>
      <div
        className="overflow-y-auto rounded-lg h-[90%]"
        onDrop={(e) => onDrop(e, columnTitle)}
        onDragOver={(e) => allowDrop(e)}
      >
        {tasks
          .filter((task) => task.progress === columnTitle)
          .map((task) => (
            <div
              key={task.name}
              className="bg-white py-[5%] m-[5%] h-[35%] w-[90%] rounded-xl cursor-move flex flex-col justify-center items-center"
              draggable
              onDragStart={(e) => onDragStart(e, task)}
            >
              <div className="w-[90%] flex flex-row justify-between">
                <h1 className="text-2xl  ">{task.name}</h1>
                <button className=" bg-[#ffffff51] text-sm px-5 h-8 flex flex-col justify-center rounded-full items-center">
                  {" "}
                  {columnTitle}
                </button>
              </div>
              <div className="flex flex-row w-[90%] h-[20%] justify-evenly item-center ml-[-5%] gap-[10%] mt-[10%]">
                <button className="rounded-lg bg-[#ff00006b] text-sm  w-[40%] px-2 flex flex-col justify-center  items-center">
                  {task.timeToComplete}
                </button>
                <button className="rounded-lg bg-[#00a2ff86] text-sm  px-2 w-[40%] flex flex-col justify-center  items-center">
                  {task.dueDate}
                </button>
                <button className="rounded-lg bg-[#00ff1186] text-sm  px-2 w-[40%] flex flex-col justify-center  items-center">
                  {task.grouping}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default ColumnComponent;
