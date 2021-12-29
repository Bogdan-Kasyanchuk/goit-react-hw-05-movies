import { NavLink } from 'react-router-dom';
// import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <ul>
      <li>
        <NavLink style={{ fontSize: 30 }} to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink style={{ fontSize: 30 }} to="/movies">
          Movies
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
