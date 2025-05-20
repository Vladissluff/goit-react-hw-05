import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="nav">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? 'active' : 'link')}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? 'active' : 'link')}
      >
        Movies
      </NavLink>
    </nav>
  );
}
