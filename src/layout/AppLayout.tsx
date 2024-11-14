import Header from '@/components/custom/Header';
import Sidebar from '@/components/custom/Sidebar';
import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div className='grid grid-cols-[26rem_1fr] grid-rows-[auto_1fr] h-screen'>
      <Header />
      <Sidebar />
      <main className='bg-gradient-to-b from-gray-100 to-gray-200 px-[4.8rem] pt-[4rem] pb-[6rem] overflow-scroll'>
        <div className='max-w-[130rem] my-0 mx-auto flex flex-col gap-[3.2rem] h-full'>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
