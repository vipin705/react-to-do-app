import Logo from './Logo';
import MainNav from './MainNav';

function Sidebar() {
  return (
    <div className='row-span-full py-[3.2rem] px-[2.4rem] flex flex-col gap-12 bg-gray-50'>
      <Logo />
      <MainNav />
    </div>
  );
}

export default Sidebar;
