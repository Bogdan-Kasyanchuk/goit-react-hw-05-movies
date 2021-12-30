import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from 'components/Loading';
import Toastify from 'components/Toastify';
import ReviewsItem from 'components/ReviewsItem';
import Button from 'components/Button';
import { getReviews } from 'apiServices/movieAPI';
import { scrollBottom, scrollPosition } from 'helpers/scrollBottom';
import scrollTop from 'helpers/scrollTop';
import styles from './Reviews.module.css';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  NOTFOUND: 'notFound',
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchReviews() {
      const { PENDING, RESOLVED, NOTFOUND } = Status;
      setStatus(PENDING);
      await getReviews(movieId, page)
        .then(data => {
          if (!data.results.length) {
            setStatus(NOTFOUND);
            Toastify('warning', "We don't have any reviews for this movie!");
          } else {
            setTotalPages(data.total_pages);
            setReviews(reviews => [...reviews, ...data.results]);
            setStatus(RESOLVED);
          }
        })
        .catch(error => {
          setStatus(NOTFOUND);
          Toastify('error', `${error}`);
        });
      if (page >= 2) scrollBottom();
    }
    fetchReviews();
  }, [movieId, page]);

  const getLoadMore = () => {
    scrollPosition();
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      {status === 'pending' && <Loading />}
      {status === 'notFound' && (
        <p className={styles['reviews-title']}>
          We don't have any reviews for this movie!
        </p>
      )}
      {status === 'resolved' && (
        <ul className={styles['reviews-list']}>
          {reviews.map(element => (
            <ReviewsItem key={element.id} element={element} />
          ))}
        </ul>
      )}
      {reviews.length > 15 && page < totalPages && (
        <Button
          name={'Load more'}
          nameClass="load-button"
          onClick={getLoadMore}
        />
      )}
      {reviews.length > 5 && (
        <Button name={'To UP'} nameClass="up-button" onClick={scrollTop} />
      )}
    </>
  );
};

export default Reviews;
