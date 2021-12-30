import PropTypes from 'prop-types';
import PhotoNotAvailable from '../../images/photo-not-available.jpg';
import styles from './CastItem.module.css';

const CastItem = ({ element }) => {
  return (
    <li className={styles['cast-item']}>
      <img
        className={styles['cast-img']}
        src={
          element.profile_path
            ? `https://image.tmdb.org/t/p/w500${element.profile_path}`
            : PhotoNotAvailable
        }
        alt={element.name ? element.name : element.original_name}
      />
      <p className={styles['cast-title']}>
        {' '}
        {element.name ? element.name : element.original_name}
      </p>
      <p className={styles['cast-text']}> {element.character}</p>
      <p className={styles['cast-text']}> {element.popularity}</p>
    </li>
  );
};

CastItem.propTypes = {
  element: PropTypes.shape({
    profile_path: PropTypes.string,
    name: PropTypes.string,
    original_name: PropTypes.string,
    character: PropTypes.string,
    popularity: PropTypes.number,
  }),
};

export default CastItem;
