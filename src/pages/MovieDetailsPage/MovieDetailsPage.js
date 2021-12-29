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
// import styles from './MovieDetailsPage.module.css';

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
      <div>
        <Button name={'Back'} nameClass="back-button" onClick={onGoBack} />
        {status === 'notFound' && <NotFound />}
        {status === 'resolved' && (
          <div>
            <div style={{ display: 'flex' }}>
              <div style={{ maxWidth: '200px', marginRight: '20px' }}>
                <img
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
              <div>
                <h2>
                  {movieInform.title
                    ? movieInform.title
                    : movieInform.original_title}{' '}
                  ({movieInform.release_date.slice(0, 4)})
                </h2>
                <ul>
                  <li>
                    Vote count: <span>{movieInform.vote_count}</span>
                  </li>
                  <li>
                    Vote average: <span>{movieInform.vote_average}</span>
                  </li>
                </ul>
                <div>
                  <h3>Overview:</h3>
                  <p>{movieInform.overview}</p>
                </div>

                <div>
                  <h3>Genres:</h3>
                  <ul>
                    {movieInform.genres.map(element => (
                      <li key={element.id}>{element.name}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Production companies:</h3>
                  <ul>
                    {movieInform.production_companies.map(element => (
                      <li key={element.id}>
                        <img
                          style={{ maxWidth: '200px' }}
                          src={
                            element.logo_path
                              ? `https://image.tmdb.org/t/p/w500${element.logo_path}`
                              : PosterNotAvailable
                          }
                          alt={element.name}
                        />
                        {element.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Production countries:</h3>
                  <ul>
                    {movieInform.production_countries.map(element => (
                      <li key={element.name}>{element.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h3>Additionsl information</h3>
              <ul>
                <li>
                  <NavLink to={`${url}/cast`}>Cast</NavLink>
                </li>
                <li>
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
