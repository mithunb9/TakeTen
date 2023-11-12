import { useEffect } from "react";
import Navbar from "../components/NavBar";
import KanbanBoard from "./screens/kanbanBoard";

export default function Home() {
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        new Notification("Welcome to Take10!", {
          body: "You can now receive notifications from Take10!",
        });
      });
    }
  }, []);

  function sendNotification() {
    new Notification("Welcome to Take10!", {
      body: "You can now receive notifications from Take10!",
    });
  }

  return (
    <>
      <div
        className={
          "bg-white bg-cover h-[100vh] w-[100vw] bg-[url('../components/images/bg.svg')]"
        }
      >
        <Navbar />
        <KanbanBoard />
      </div>
    </>
  );
}
