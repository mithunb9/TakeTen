import React, { useState } from "react";
import Image from "next/image";
import Navbar from "../components/NavBar";
import { GrClose } from "react-icons/gr";

const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-25 backdrop-blur-md flex justify-center items-center z-[1]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 h-1/2">
        {children}
      </div>
    </div>
  );
};

export default Modal;
