import PropTypes from 'prop-types';
import PhotoNotAvailable from '../../images/photo-not-available.jpg';
import styles from './CastItem.module.css';

const CastItem = ({ element }) => {
  return (
    <li className={styles['cast-item']}>
      <div className={styles['cast-wrapper-img']}>
        <img
          className={styles['cast-img']}
          src={
            element.profile_path
              ? `https://image.tmdb.org/t/p/w500${element.profile_path}`
              : PhotoNotAvailable
          }
          alt={element.name ? element.name : element.original_name}
        />
      </div>
      <div className={styles['cast-description']}>
        <p className={styles['cast-title']}>
          {' '}
          {element.name ? element.name : element.original_name}
        </p>
        <p className={styles['cast-text']}>
          Character: <span>{element.character}</span>
        </p>
        <p className={styles['cast-text']}>
          Popularity: <span>{element.popularity}</span>
        </p>
      </div>
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
