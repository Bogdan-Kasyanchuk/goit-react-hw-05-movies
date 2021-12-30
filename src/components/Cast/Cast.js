import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from 'components/Loading';
import Toastify from 'components/Toastify';
import CastItem from 'components/CastItem';
import Button from 'components/Button';
import { getCredits } from 'apiServices/movieAPI';
import scrollTop from 'helpers/scrollTop';
import styles from './Cast.module.css';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  NOTFOUND: 'notFound',
};

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [status, setStatus] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const { PENDING, RESOLVED, NOTFOUND } = Status;
    setStatus(PENDING);
    getCredits(movieId)
      .then(data => {
        if (!data.cast.length) {
          setStatus(NOTFOUND);
          Toastify('warning', "We don't have any reviews for this movie!");
        } else {
          setCast(data.cast);
          setStatus(RESOLVED);
        }
      })
      .catch(error => {
        setStatus(NOTFOUND);
        Toastify('error', `${error}`);
      });
  }, [movieId]);

  return (
    <>
      {status === 'pending' && <Loading />}
      {status === 'notFound' && (
        <p className={styles['cast-title']}>
          We don't have any reviews for this movie!
        </p>
      )}
      {status === 'resolved' && (
        <ul className={styles['cast-list']}>
          {cast.map(element => (
            <CastItem key={element.id} element={element} />
          ))}
        </ul>
      )}
      {cast.length > 12 && (
        <Button name={'To UP'} nameClass="up-button" onClick={scrollTop} />
      )}
    </>
  );
};

export default Cast;
