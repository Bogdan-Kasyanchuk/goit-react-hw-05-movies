import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import PosterNotAvailable from '../../images/poster-not-available.jpg';
import styles from './MovieCard.module.css';

const MovieCard = ({ element, url }) => {
  const location = useLocation();

  return (
    <li className={styles['movie-item']}>
      <Link
        className={styles['movie-link']}
        to={{
          pathname: `${url}/${element.id}`,
          state: { from: location },
        }}
      >
        <img
          className={styles['movie-img']}
          src={
            element.poster_path
              ? `https://image.tmdb.org/t/p/w500${element.poster_path}`
              : PosterNotAvailable
          }
          alt={
            element.title || element.original_title
              ? element.title || element.original_title
              : element.name || element.original_name
          }
        />
        <div className={styles['movie-description']}>
          <p className={styles['movie-title']}>
            {element.title || element.original_title
              ? element.title || element.original_title
              : element.name || element.original_name}
          </p>
          <p className={styles['movie-average']}> {element.vote_average}</p>
        </div>
      </Link>
    </li>
  );
};

MovieCard.propTypes = {
  element: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string,
    original_title: PropTypes.string,
    name: PropTypes.string,
    original_name: PropTypes.string,
    vote_average: PropTypes.number,
  }),
  url: PropTypes.string.isRequired,
};

export default MovieCard;
