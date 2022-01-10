import PropTypes from 'prop-types';
import PhotoNotAvailable from '../../images/photo-not-available.jpg';
import styles from './ReviewsItem.module.css';

const ReviewsItem = ({ element }) => {
  return (
    <li className={styles['reviews-item']}>
      <div className={styles['reviews-wrapper']}>
        <div className={styles['reviews-wrapper-img']}>
          <img
            className={styles['reviews-img']}
            src={
              !element.author_details.avatar_path
                ? PhotoNotAvailable
                : (element.author_details.avatar_path.includes('/https:') &&
                    element.author_details.avatar_path.slice(1)) ||
                  `https://secure.gravatar.com/avatar${element.author_details.avatar_path}`
            }
            alt={element.author}
          />
        </div>
        <p className={styles['reviews-title']}> {element.author}</p>
      </div>
      <p className={styles['reviews-text']}> {element.content}</p>
    </li>
  );
};

ReviewsItem.propTypes = {
  element: PropTypes.shape({
    author_details: PropTypes.shape({
      avatar_path: PropTypes.string,
    }),
    author: PropTypes.string,
    content: PropTypes.string,
  }),
};

export default ReviewsItem;
