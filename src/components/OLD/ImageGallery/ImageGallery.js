import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={styles.gallery} onClick={onClick}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          webformatURL={image.webformatURL}
          largeImageURL={image.largeImageURL}
          user={image.user}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
