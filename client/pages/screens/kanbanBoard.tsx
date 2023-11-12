import React, { ChangeEvent, useState } from "react";
import ColumnComponent from "../../components/ColumnComponents"; // Import the new component
import Modal from "../../components/Modal";
import axios from "axios";
import { GrCheckmark, GrClose } from "react-icons/gr";
import { AiOutlinePlus } from "react-icons/ai";

interface Task {
  id: number; // Unique identifier for each task
  name: string;
  timeToComplete: string;
  progress: string;
  dueDate: string;
  grouping: string;
}

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskClass, setTaskClass] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [shown, setShown] = useState(false);

  const addTask = () => {
    setModalOpen(true);
    // Generate a new task with a unique id and default values
    // const newTask: Task = {
    //   id: tasks.length + 1, // This assumes tasks are never deleted
    //   name: "New Task",
    //   timeToComplete: "1 hour",
    //   progress: "Not Started",
    //   dueDate: "2023-12-31",
    //   grouping: "Group 1",
    // }; // alter this to make a post request to the backend to add a new task

    // // Add the new task to the current state
    // setTasks([...tasks, newTask]);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task) => {
    e.dataTransfer.setData("application/json", JSON.stringify(task));
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    newColumn: string
  ) => {
    e.preventDefault();
    const droppedTask = JSON.parse(e.dataTransfer.getData("application/json"));

    // Remove the task from the old column
    const updatedTasks = tasks.filter((task) => task.id !== droppedTask.id);

    // Add the task to the new column
    setTasks([...updatedTasks, { ...droppedTask, progress: newColumn }]);
  };

  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  function updateTaskName(event: ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();

    setTaskName(event.target.value);
  }

  function submitTaskName(): void {
    if (shown == false) {
      axios.get("/api/task", { params: { name: taskName } }).then((res) => {
        // remove all spaces from outside the "" and then parse the json

        const data = res.data.split("\n");
        // remove all "" from the data
        for (let i = 0; i < data.length; i++) {
          data[i] = data[i].replace(/"/g, "");
        }

        // remove all spaces from the beginning and end of the data
        for (let i = 0; i < data.length; i++) {
          data[i] = data[i].trim();
        }

        // remove all data from the left side of the :
        for (let i = 0; i < data.length; i++) {
          data[i] = data[i].substring(data[i].indexOf(":") + 1);
        }

        console.log(data);
        setTaskName(data[0]);
        setTaskClass(data[2]);
        setTaskDueDate(data[1]);
        setTaskTime(data[3]);

        setShown(true);
      });
    } else {
      setModalOpen(false);

      const newTask: Task = {
        id: tasks.length + 1, // This assumes tasks are never deleted
        name: taskName,
        timeToComplete: taskTime,
        progress: "Not Started",
        dueDate: taskDueDate,
        grouping: taskClass,
      }; // alter this to make a post request to the backend to add a new task

      // Add the new task to the current state
      setTasks([...tasks, newTask]);

      setTaskName("");
      setTaskClass("");
      setTaskDueDate("");
      setTaskTime("");
      setShown(false);
    }
  }

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
          <div className="w-0.25 h-[100%] border border-black" />
          <ColumnComponent
            tasks={tasks}
            columnTitle="In Progress"
            onDrop={handleDrop}
            allowDrop={allowDrop}
            onDragStart={handleDragStart}
          />
          <div className="w-0.25 h-[100%] border border-black" />

          <ColumnComponent
            tasks={tasks}
            columnTitle="Done"
            onDrop={handleDrop}
            allowDrop={allowDrop}
            onDragStart={handleDragStart}
          />
        </div>
        <div className="w-[90vw] flex justify-end items-center h-[10vh]">
          <button
            className=" bg-[#ffffff29] rounded-full h-16 flex items-center justify-center w-16 gap-[2%] hover:bg-[#424cb7] hover:text-white hover:delay-150 text-black text-4xl px-5"
            onClick={addTask}
          >
            <AiOutlinePlus />
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <div className="flex flex-col justify-between h-full">
          {/* Content to be centered */}
          <div className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Task Name"
              onChange={updateTaskName}
              value={taskName}
              className="border-2 border-gray-300 p-2 rounded-lg w-full"
            />

            {shown && (
              <div className="flex flex-row">
                <input
                  value={taskClass}
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                />
                <input
                  value={taskDueDate}
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                />
              </div>
            )}
          </div>

          <div className="flex flex-row items-center mt-4">
            <button
              className="bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded flex flex-row justify-center items-center"
              onClick={submitTaskName}
            >
              <GrCheckmark className="mr-2" />
              {(shown && "Confirm") || "Add Task"}
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="bg-gray-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded flex flex-row justify-center items-center ml-4"
            >
              <GrClose className="mr-2" />
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default KanbanBoard;
