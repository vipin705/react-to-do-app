import { HiOutlineHome, HiBars4, HiChartBar } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';

function MainNav() {
  return (
    <nav>
      <ul className='flex flex-col gap-4 items-center justify-center'>
        <li className='w-full'>
          <NavLink to='/home' className='nav-link'>
            <HiOutlineHome />
            <span>Home</span>
          </NavLink>
        </li>
        <li className='w-full'>
          <NavLink to='/tasks' className='nav-link'>
            <HiBars4 />
            <span>Tasks</span>
          </NavLink>
        </li>
        <li className='w-full'>
          <NavLink to='/analytics' className='nav-link'>
            <HiChartBar />
            <span>Analytics</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
