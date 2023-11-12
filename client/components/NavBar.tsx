import React from 'react';

const Navbar = () => {
  return (
    <div className='flex flex-row justify-between bg-white-500 items-center h-[10vh]'>
        <div>
            <h1 className='text-xl'></h1>
        </div>
        <div>
            <button className='bg-[#00ff00]'>
                Add Session
            </button>
        </div>
    </div>
  );
};

export default Navbar;