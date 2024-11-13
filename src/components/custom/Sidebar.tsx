import Logo from './Logo';
import MainNav from './MainNav';

function Sidebar() {
  return (
    <div className='row-span-full py-12 px-10 flex flex-col gap-12 bg-gray-50'>
      <Logo />
      <MainNav />
    </div>
  );
}

export default Sidebar;
