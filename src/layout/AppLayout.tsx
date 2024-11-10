import Sidebar from '@/components/custom/Sidebar';
import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div className='grid grid-cols-[26rem_1fr] grid-rows-[auto_1fr] h-screen'>
      <header className='py-6 px-16 bg-gray-50 border-2 border-gray-100'>
        header
      </header>
      <Sidebar />
      <main className='bg-gradient-to-b from-gray-100 to-gray-200 px-[4.8rem] pt-[4rem] pb-[6rem] overflow-scroll'>
        <div className='max-w-[120rem] my-0 mx-auto flex flex-col gap-[3.2rem]'>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
