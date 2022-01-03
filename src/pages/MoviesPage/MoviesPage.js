import { useState, useEffect } from 'react';
import { useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import Loading from 'components/Loading';
import MovieCard from 'components/MovieCard';
import NotFound from 'components/NotFound';
import SearchBar from 'components/SearchBar';
import Toastify from 'components/Toastify';
import Button from 'components/Button';
import { getMovie } from 'apiServices/movieAPI';
import scrollTop from 'helpers/scrollTop';
import { scrollBottom, scrollPosition } from 'helpers/scrollBottom';
import styles from './MoviesPage.module.css';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  NOTFOUND: 'notFound',
};

const MoviesPage = () => {
  const history = useHistory();
  const location = useLocation();
  const currentSearchQuery =
    new URLSearchParams(location.search).get('query') ?? '';
  const currentPage = new URLSearchParams(location.search).get('page') ?? 1;
  const [movie, setMovie] = useState([]);
  const [status, setStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState(currentSearchQuery);
  const [page, setPage] = useState(currentPage);
  const [totalPages, setTotalPages] = useState(0);
  const { url } = useRouteMatch();

  useEffect(() => {
    if (!searchQuery) return;
    const { PENDING, RESOLVED, NOTFOUND } = Status;
    setStatus(PENDING);
    async function fetchMovie() {
      await getMovie(searchQuery, page)
        .then(data => {
          if (!data.results.length) {
            setStatus(NOTFOUND);
            Toastify('warning', 'Sorry, there are no movies!');
          } else {
            setTotalPages(data.total_pages);
            setMovie(movieTrending => [...movieTrending, ...data.results]);
            setStatus(RESOLVED);
          }
        })
        .catch(error => {
          setStatus(NOTFOUND);
          Toastify('error', `${error}`);
        });
      if (page >= 2) scrollBottom();
    }
    fetchMovie();
    if (page === 1) pushToHistory(searchQuery, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, page]);

  const pushToHistory = (query, value) =>
    history.push({
      ...location,
      search: `query=${query}&page=${value}`,
    });

  const handleFormSubmit = query => {
    if (query !== searchQuery) {
      setMovie([]);
      setSearchQuery(query);
      setPage(1);
    }
  };

  const getLoadMore = () => {
    scrollPosition();
    setPage(prevState => Number(prevState) + 1);
    pushToHistory(searchQuery, Number(page) + 1);
  };

  return (
    <>
      {status === 'pending' && <Loading />}
      <div className={styles['movie-wrapper']}>
        <SearchBar onSubmit={handleFormSubmit} />
        {status === 'notFound' && <NotFound />}
        {status === 'resolved' && (
          <ul className={styles['movie-list']}>
            {movie.map(element => (
              <MovieCard key={element.id} element={element} url={url} />
            ))}
          </ul>
        )}
      </div>
      {movie.length > 15 && page < totalPages && (
        <Button
          name={'Load more'}
          nameClass="load-button"
          onClick={getLoadMore}
        />
      )}
      {movie.length > 15 && (
        <Button name={'To UP'} nameClass="up-button" onClick={scrollTop} />
      )}
    </>
  );
};

export default MoviesPage;
