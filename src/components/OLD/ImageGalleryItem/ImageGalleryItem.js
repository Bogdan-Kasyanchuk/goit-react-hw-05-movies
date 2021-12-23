import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, user, largeImageURL }) => {
  return (
    <li className={styles['gallery-item']}>
      <img
        className={styles['gallery-item-image']}
        src={webformatURL}
        alt={user}
        data-fullsize={largeImageURL}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
