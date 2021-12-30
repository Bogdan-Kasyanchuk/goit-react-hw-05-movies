import { useState, useEffect, lazy } from 'react';
import {
  Route,
  useParams,
  NavLink,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import Loading from 'components/Loading';
import NotFound from 'components/NotFound';
import Toastify from 'components/Toastify';
import PosterNotAvailable from '../../images/poster-not-available.jpg';
import Button from 'components/Button';
import { getMovieInform } from 'apiServices/movieAPI';
import styles from './MovieDetailsPage.module.css';

const Cast = lazy(() =>
  import('components/Cast' /* webpackChunkName: "Cast" */),
);
const Reviews = lazy(() =>
  import('components/Reviews' /* webpackChunkName: "Reviews" */),
);

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  NOTFOUND: 'notFound',
};

const MovieDetailsPage = () => {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const { movieId } = useParams();
  const [movieInform, setMovieInform] = useState({});
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const { PENDING, RESOLVED, NOTFOUND } = Status;
    setStatus(PENDING);
    getMovieInform(movieId)
      .then(data => {
        if (Object.keys(data).length === 0) {
          setStatus(NOTFOUND);
          Toastify('warning', 'Sorry, there are no movies!');
        } else {
          setMovieInform(data);
          setStatus(RESOLVED);
        }
      })
      .catch(error => {
        setStatus(NOTFOUND);
        Toastify('error', `${error}`);
      });
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/movies');
  };

  return (
    <>
      {status === 'pending' && <Loading />}
      <div className={styles['movie-details-container']}>
        <Button name={'Go Back'} nameClass="back-button" onClick={onGoBack} />
        {status === 'notFound' && <NotFound />}
        {status === 'resolved' && (
          <div className={styles['movie-details-wrapper-all']}>
            <div className={styles['movie-details-wrapper']}>
              <div className={styles['movie-details-wrapper-img']}>
                <img
                  className={styles['movie-details-img']}
                  src={
                    movieInform.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movieInform.poster_path}`
                      : PosterNotAvailable
                  }
                  alt={
                    movieInform.title
                      ? movieInform.title
                      : movieInform.original_title
                  }
                />
              </div>
              <div className={styles['movie-details-description']}>
                <h2 className={styles['movie-details-title']}>
                  {movieInform.title
                    ? movieInform.title
                    : movieInform.original_title}{' '}
                  ({movieInform.release_date.slice(0, 4)})
                </h2>
                <ul className={styles['movie-details-list']}>
                  <li className={styles['movie-details-item']}>
                    Vote count: <span>{movieInform.vote_count}</span>
                  </li>
                  <li className={styles['movie-details-item']}>
                    Vote average: <span>{movieInform.vote_average}</span>
                  </li>
                </ul>
                <div className={styles['movie-details-overview']}>
                  <h3 className={styles['movie-details-overview-title']}>
                    Overview:
                  </h3>
                  <p className={styles['movie-details-overview-text']}>
                    {movieInform.overview}
                  </p>
                </div>

                <div className={styles['movie-details-genres']}>
                  <h3 className={styles['movie-details-genres-title']}>
                    Genres:
                  </h3>
                  <ul className={styles['movie-details-genres-list']}>
                    {movieInform.genres.map(element => (
                      <li
                        className={styles['movie-details-genres-item']}
                        key={element.id}
                      >
                        {element.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles['movie-details-countries']}>
                  <h3 className={styles['movie-details-countries-title']}>
                    Production countries:
                  </h3>
                  <ul className={styles['movie-details-countries-list']}>
                    {movieInform.production_countries.map(element => (
                      <li
                        className={styles['movie-details-countries-item']}
                        key={element.name}
                      >
                        {element.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles['add-inform-wrapper']}>
              <h3 className={styles['add-inform-title']}>
                Additionsl information
              </h3>
              <ul className={styles['add-inform-list']}>
                <li className={styles['add-inform-item']}>
                  <NavLink to={`${url}/cast`}>Cast</NavLink>
                </li>
                <li className={styles['add-inform-item']}>
                  <NavLink to={`${url}/reviews`}> Reviews</NavLink>
                </li>
              </ul>
              <div>
                <Route exact path={`${path}/cast`} component={Cast} />
                <Route exact path={`${path}/reviews`} component={Reviews} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MovieDetailsPage;
