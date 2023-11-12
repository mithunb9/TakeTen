import Navbar from "../components/NavBar";
import KanbanBoard from "./screens/kanbanBoard";

export default function Home() {
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
