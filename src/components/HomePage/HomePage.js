import { useState, useEffect } from 'react';
import {
  getTrending,
  // getMovie,
  // getMovieInform,
  // getCredits,
  // getReviews,
} from 'apiServices/movieAPI';
import Loading from 'components/Loading';
import Toastify from 'components/Toastify';
import scrollTop from 'helpers/scrollTop';
// import styles from './HomePage.module.css';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  NOTFOUND: 'notFound',
};

// getTrending();
// getMovie('Spider', 1);
// getMovieInform(624860);
// getCredits(624860);
// getReviews(634649);

const HomePage = () => {
  const [movieTrending, setMovieTrending] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const { PENDING, RESOLVED, NOTFOUND } = Status;
    getTrending().then(data => {
      console.log(data.results);
      return setMovieTrending(data.results);
    });
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <ul>
        {movieTrending.map(element => (
          <li key={element.id}>{element.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
