import React from 'react';

const Navbar = () => {
  return (
    <div className='flex flex-row justify-between items-center'>
        <div>
            <h1 className='text-xl'>Take10</h1>
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