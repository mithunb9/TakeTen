import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import { useRouter } from "next/router";

function extractHours(timeStr) {
  let matches = timeStr.match(/(\d+)/);
  return matches ? parseInt(matches[1]) : 0;
}

const Study = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    let length = parseInt(router.query.length);
    let tasks = undefined;

    if (router.query.tasks != undefined) {
      tasks = JSON.parse(router.query.tasks);
    }

    console.log(length);

    if (tasks != undefined) {
      // sort data based on timeToComplete

      tasks.sort(
        (a, b) =>
          extractHours(a.timeToComplete) - extractHours(b.timeToComplete)
      );

      // implement 0 - 1  knapsack
      let timeTaken = 0;
      let out = [];

      for (let i = 0; i < tasks.length; i++) {
        let possibleLength = extractHours(tasks[i].timeToComplete);
        console.log("Calc: ", timeTaken + possibleLength);
        if (timeTaken + possibleLength <= 4) {
          length = timeTaken + possibleLength;
          out.push(tasks[i]);
        } else {
          break;
        }
      }

      setData(out);

      console.log(out);
    }
  }, []);

  return (
    <div>
      <div
        className={
          "bg-white bg-cover h-[100vh] w-[100vw] bg-[url('../components/images/bg.svg')]"
        }
      >
        <Navbar />
        {data?.map((task) => (
          <div
            key={task.name}
            className="bg-white py-[5%] m-[5%] h-[35%] w-[90%] rounded-xl flex flex-col justify-center items-center shadow-md text-black"
          >
            <div className="w-[90%] flex flex-row justify-between">
              <h1 className="text-2xl  ">{task.name}</h1>
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

export default Study;
