import { NavLink } from 'react-router-dom';

function MainNav() {
  return (
    <nav>
      <ul className='flex flex-col gap-4'>
        <li>
          <NavLink to='/home' className='nav-link'>
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/tasks'>
            <span>Tasks</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/analytics'>
            <span>Analytics</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
