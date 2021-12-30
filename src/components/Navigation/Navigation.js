import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <ul className={styles['navigation-list']}>
        <li className={styles['navigation-item']}>
          <NavLink
            exact
            to="/"
            className={styles['navigation-link']}
            activeClassName={styles['navigation-link-active']}
          >
            Home
          </NavLink>
        </li>
        <li className={styles['navigation-item']}>
          <NavLink
            to="/movies"
            className={styles['navigation-link']}
            activeClassName={styles['navigation-link-active']}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
