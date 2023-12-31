import React, { ChangeEvent, useState } from "react";
import ColumnComponent from "../../components/ColumnComponents"; // Import the new component
import Modal from "../../components/Modal";
import axios from "axios";
import { GrCheckmark, GrClose, GrAttachment } from "react-icons/gr";
import { AiOutlinePlus } from "react-icons/ai";
import { BsPlay } from "react-icons/bs";
import Dropzone from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import Webcam from "./photos";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { useRouter } from "next/router";
import FileUpload from "@/components/FileUpload";

interface Task {
  id: number; // Unique identifier for each task
  name: string;
  timeToComplete: string;
  progress: string;
  dueDate: string;
  grouping: string;
}

interface uploadProps {
  filetype: any;
  inputTextPlaceholder?: any;
}

const KanbanBoard: React.FC = () => {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskClass, setTaskClass] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [shown, setShown] = useState(false);
  const [length, setLength] = useState(6);
  const [modalSessionOpen, setModalSessionOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const Spinner = () => (
    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 0116 0H4z"
      ></path>
    </svg>
  );

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.text();

        if (data && typeof data === "string") {
          const parsedData = JSON.parse(data); // Assuming data is a JSON string

          if (Array.isArray(parsedData)) {
            // Iterate through each object in parsedData and add to tasks
            const newTasks = parsedData.map((item, index) => ({
              id: tasks.length + index + 1, // Generate a unique id
              name: item.name || "Task " + (tasks.length + index + 1),
              timeToComplete: item.time || "1 hour",
              progress: "Not Started",
              dueDate: item.dueDate || "2023-12-31",
              grouping: item.className.split("_")[0] || "Group 1",
              ...item, // Include any additional properties from item
            }));

            // Add the new tasks to the current state
            setTasks([...tasks, ...newTasks]);

            console.log("Task blocks:", parsedData);

            setIsUploading(false);
            setModalOpen(false);
          } else {
            console.error("Invalid data format received from server");
          }
        } else {
          console.error("No text data received from server");
        }
      } else {
        console.error(
          "Error uploading file. Server returned:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    setIsUploading(false);
  };

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

  function updateTaskClass(event: ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();

    setTaskClass(event.target.value);
  }

  function updateTaskDueDate(event: ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();

    setTaskDueDate(event.target.value);
  }

  function submitTaskName(): void {
    setIsProcessing(true);

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

      setIsProcessing(false);
    }
  }

  function startSession(): void {
    setModalSessionOpen(false);
    console.log(length);
    // route to page class
    router.push({
      pathname: "/study",
      query: { length: length, tasks: JSON.stringify(tasks) },
    });
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
            color="text-[#E94F37]"
          />
          <div className="w-0.25 h-[100%] border border-black" />
          <ColumnComponent
            tasks={tasks}
            columnTitle="In Progress"
            onDrop={handleDrop}
            allowDrop={allowDrop}
            onDragStart={handleDragStart}
            color="text-[#56638A]"
          />
          <div className="w-0.25 h-[100%] border border-black" />

          <ColumnComponent
            tasks={tasks}
            columnTitle="Done"
            onDrop={handleDrop}
            allowDrop={allowDrop}
            onDragStart={handleDragStart}
            color="text-[#63D471]"
          />
        </div>
        <div className="w-[95vw] flex justify-end gap-[15%] items-center h-[10vh]">
          <div className="flex flex-col mb-[20%]">
            <button
              className="rounded-full my-5 h-16 flex items-center justify-center w-16 gap-[2%] bg-[#424cb7] hover:bg-[#78c0e0]"
              onClick={addTask}
            >
              <AiOutlinePlus />
            </button>
            <button
              className="rounded-full h-16 my-5 flex items-center justify-center w-16 gap-[2%] bg-[#424cb7] hover:bg-[#78c0e0] text-white text-black text-4xl px-5"
              onClick={() => setModalSessionOpen(true)}
            >
              <BsPlay />
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <div className="flex flex-col justify-between text-black h-full">
          {/* Content to be centered */}
          <div className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Task Name"
              onChange={updateTaskName}
              value={taskName}
              className="border-2 border-black bg-inherit p-2 rounded-lg w-full"
            />

            <div className="flex flex-row my-2 space-x-2">
              <input
                value={taskClass}
                placeholder="Class Name"
                onChange={updateTaskClass}
                className="border-2 border-black bg-inherit p-2 rounded-lg w-full"
              />
              <input
                value={taskDueDate}
                placeholder="Due Date"
                onChange={updateTaskDueDate}
                className="border-2 border-black bg-inherit p-2 rounded-lg w-full"
              />
            </div>
            <div className="border-b border-black h-[1px]"></div>
            <div className="flex flex-row">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className=" text-black font-bold py-2 px-4 rounded flex flex-row justify-center items-center ml-4 outline mt-4 font-normal"
              />
              <button
                onClick={handleFileUpload}
                className="bg-blue-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded flex flex-row justify-center items-center ml-4 h-10 mt-[1.2rem]"
              >
                {isUploading ? <Spinner /> : <GrAttachment class="mr-2" />}
                {isUploading ? "Uploading..." : " Upload"}
              </button>
            </div>
          </div>

          <div className="flex flex-row items-center mt-4">
            <button
              onClick={() => setModalOpen(false)}
              className="bg-gray-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded flex flex-row justify-center items-center mr-4"
            >
              <GrClose className="mr-2" color="white" />
              Close
            </button>
            <button
              className="bg-blue-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded flex flex-row justify-center items-center"
              onClick={submitTaskName}
            >
              <GrCheckmark className="mr-2" color="white" />
              {(shown && "Confirm") || "Add Task"}
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={modalSessionOpen}
        onClose={() => {
          setModalSessionOpen(false);
        }}
      >
        <div className="flex flex-col text-black justify-between h-[80vh]">
          <div className="flex flex-col justify-center items-center">
            <input
              type="number"
              placeholder="Number of hours to study"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="border-2 border-black bg-inherit p-2 rounded-lg w-full"
            />

            <div className="flex flex-row items-center mt-4">
              <button
                onClick={() => setModalSessionOpen(false)}
                className="bg-gray-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded flex flex-row justify-center items-center mr-4"
              >
                <GrClose className="mr-2" color="white" />
                Close
              </button>
              <button
                className="bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded flex flex-row justify-center items-center ml-4 "
                onClick={startSession}
              >
                <BsPlay className="mr-2" />
                Start
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default KanbanBoard;
