import React, { useState } from "react";
import Modal from "./Modal";

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-row justify-between bg-white-500 items-center h-[10vh]">
        <div>
          <h1 className="text-xl"></h1>
        </div>
        <div>
          <button className="bg-[#00ff00]" onClick={() => setModalOpen(true)}>
            Add Session
          </button>
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
                  type="number"
                  placeholder="Number of hours to study"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                />
              </div>
              <div className="flex flex-row items-center mt-4">
                <button
                  className="bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded flex flex-row justify-center items-center"
                  onClick={() => setModalOpen(false)}
                >
                  Confirm
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded flex flex-row justify-center items-center ml-4"
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
        </div>
        <div className="flex flex-row justify-between items-center h-[12vh]">
          <h1 className="text-4xl text-black  px-[5%]">Take10</h1>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
