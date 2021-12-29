import PropTypes from 'prop-types';
import PhotoNotAvailable from '../../images/photo-not-available.jpg';
// import styles from './ReviewsItem.module.css';

const ReviewsItem = ({ element }) => {
  return (
    <li>
      <img
        style={{ maxWidth: '200px' }}
        src={
          element.author_details.avatar_path
            ? `${element.author_details.avatar_path.slice(1)}`
            : PhotoNotAvailable
        }
        alt={element.author}
      />
      <p> {element.author}</p>
      <p> {element.content}</p>
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
