import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import PosterNotAvailable from '../../images/poster-not-available.jpg';
// import styles from './MovieCard.module.css';

const MovieCard = ({ element, url }) => {
  const location = useLocation();

  return (
    <li
      style={{ maxWidth: '300px', marginBottom: '20px', marginRight: '20px' }}
    >
      <Link
        to={{
          pathname: `${url}/${element.id}`,
          state: { from: location },
        }}
      >
        <img
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
        <p>
          {element.title || element.original_title
            ? element.title || element.original_title
            : element.name || element.original_name}
        </p>
        <p> {element.vote_average}</p>
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
