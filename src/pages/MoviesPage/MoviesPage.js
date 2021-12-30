import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
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
  const [movie, setMovie] = useState([]);
  const [status, setStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
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
  }, [searchQuery, page]);

  const handleFormSubmit = query => {
    if (query !== searchQuery) {
      setMovie([]);
      setSearchQuery(query);
      setPage(1);
    }
  };

  const getLoadMore = () => {
    scrollPosition();
    setPage(prevState => prevState + 1);
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
