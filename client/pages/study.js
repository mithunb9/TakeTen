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
    if (!router.isReady) return; // Ensure router is ready

    let length = parseInt(router.query.length) || 0;
    let tasks = router.query.tasks ? JSON.parse(router.query.tasks) : [];

    console.log(length);

    // Check if tasks is defined and is an array
    if (Array.isArray(tasks)) {
      // sort data based on timeToComplete
      tasks.sort(
        (a, b) =>
          extractHours(a?.timeToComplete) - extractHours(b?.timeToComplete)
      );

      // implement 0 - 1 knapsack
      let timeTaken = 0;
      let out = [];

      for (let task of tasks) {
        let possibleLength = extractHours(task?.timeToComplete);

        if (timeTaken + possibleLength <= length) {
          timeTaken += possibleLength;
          out.push(task);
        } else {
          break;
        }
      }

      setData(out);
    }
  }, [router.isReady, router.query]);

  return (
    <div className="bg-white bg-cover h-[100vh] w-[100vw] bg-[url('../components/images/bg.svg')]">
      <div className={""}>
        <Navbar />
        <div className="overflow-y-auto max-h-[500px]">
          {data?.map((task) => (
            <div
              key={task.name}
              className="bg-white py-[5%] m-[5%] h-[35%] w-[90%] rounded-xl flex flex-col justify-center items-center shadow-md text-black"
            >
              <div className="w-[90%] flex flex-row justify-between">
                <h1 className="text-2xl">{task.name}</h1>
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
    </div>
  );
};

export default Study;
