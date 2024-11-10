import React from 'react';

const Home: React.FC = () => {
  return (
    <div className='flex justify-center items-center flex-col'>
      <h1 className='font-bold text-7xl'>Welcome to Your To-Do List App</h1>
      <p className='text-2xl mt-4 font-semibold'>
        Let's make today productive and achieve your goals one step at a time!
      </p>
    </div>
  );
};

export default Home;
