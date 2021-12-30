import { useState, useEffect } from 'react';
import MovieCard from 'components/MovieCard';
import Toastify from 'components/Toastify';
import Button from 'components/Button';
import Loading from 'components/Loading';
import { getTrending } from 'apiServices/movieAPI';
import scrollTop from 'helpers/scrollTop';
import { scrollBottom, scrollPosition } from 'helpers/scrollBottom';
import styles from './HomePage.module.css';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  NOTFOUND: 'notFound',
};

const HomePage = () => {
  const [movieTrending, setMovieTrending] = useState([]);
  const [status, setStatus] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchMovie() {
      const { PENDING, RESOLVED, NOTFOUND } = Status;
      setStatus(PENDING);
      await getTrending(page)
        .then(data => {
          if (!data.results.length) {
            setStatus(NOTFOUND);
            Toastify('warning', 'Sorry, there are no trending movies!');
          } else {
            setTotalPages(data.total_pages);
            setMovieTrending(movieTrending => [
              ...movieTrending,
              ...data.results,
            ]);
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
  }, [page]);

  const getLoadMore = () => {
    scrollPosition();
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      {status === 'pending' && <Loading />}
      {status === 'resolved' && (
        <div className={styles['home-wrapper']}>
          <h1 className={styles['home-title']}>Trending today</h1>
          <ul className={styles['home-list']}>
            {movieTrending.map(element => (
              <MovieCard key={element.id} element={element} url="movies" />
            ))}
          </ul>
        </div>
      )}
      {movieTrending.length > 15 && page < totalPages && (
        <Button
          name={'Load more'}
          nameClass="load-button"
          onClick={getLoadMore}
        />
      )}
      {movieTrending.length > 15 && (
        <Button name={'To UP'} nameClass="up-button" onClick={scrollTop} />
      )}
    </>
  );
};

export default HomePage;
