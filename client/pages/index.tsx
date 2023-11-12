import Image from "next/image";
import Navbar from "../components/NavBar";
import KanbanBoard from "./screens/kanbanBoard";
import Modal from "../components/Modal";
import image from "../components/images/blurry-gradient-haikei.svg";

export default function Home() {
  return (
    <>
      <div className=" bg-white url('../components/images/layered-waves-haikei.svg')] bg-cover `  bg- h-[100vh] w-[100vw]">
        <Navbar />
        <KanbanBoard />
      </div>
    </>
  );
}
