import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <ul className={styles['navigation-list']}>
        <li className={styles['navigation-item']}>
          <NavLink
            className={styles['navigation-link']}
            activeClassName={styles.active}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className={styles['navigation-item']}>
          <NavLink
            className={styles['navigation-link']}
            activeClassName={styles.active}
            to="/movies"
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;

// className={`${styles.button} ${styles[nameClass]}`}
