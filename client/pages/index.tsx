import Image from "next/image";
import Navbar from "../components/NavBar";
import KanbanBoard from "./screens/kanbanBoard";
import Modal from "../components/Modal";

export default function Home() {
  return (
    <>
      <Navbar />
      <KanbanBoard />
    </>
  );
}
