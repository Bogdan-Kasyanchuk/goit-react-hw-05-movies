import { useState, useEffect } from 'react';
import SearchBar from 'components/OLD/SearchBar';
import ImageGallery from 'components/ImageGallery';
import Loading from 'components/Loading';
import Toastify from 'components/Toastify';
import Modal from 'components/OLD/Modal';
import Button from 'components/OLD/Button';
import ImageNotFound from 'components/NotFound';
import PixabayAPI from '../../../apiServices';
import scrollBottom from '../../../helpers/scrollBottom';
import scrollTop from '../../../helpers/scrollTop';
import styles from './ImageFinder.module.css';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  NOTFOUND: 'notFound',
};

const ImageFinder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(null);
  const [showModal, setShowModal] = useState();
  const [alt, setAlt] = useState(null);
  const [fullSize, setFullSize] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      if (!searchQuery) return;
      const { PENDING, RESOLVED, NOTFOUND } = Status;
      setStatus(PENDING);
      await PixabayAPI(searchQuery, page)
        .then(responseImages => {
          if (!responseImages.length) {
            setStatus(NOTFOUND);
            Toastify(
              'warning',
              'Sorry, there are no images matching your search query. Please try again.',
            );
          } else {
            setImages(images => [...images, ...responseImages]);
            setStatus(RESOLVED);
          }
        })
        .catch(error => {
          setStatus(NOTFOUND);
          Toastify('error', `${error}`);
        });
      if (page >= 2) scrollBottom();
    }
    fetchData();
  }, [searchQuery, page]);

  const handleFormSubmit = query => {
    if (query !== searchQuery) {
      setImages([]);
      setSearchQuery(query);
      setPage(1);
    }
  };

  const handleClick = event => {
    if (showModal) {
      setShowModal(!showModal);
      setAlt(null);
      setFullSize(null);
    } else {
      if (event.target.nodeName !== 'IMG') return;
      setShowModal(!showModal);
      setAlt(event.target.alt);
      setFullSize(event.target.dataset.fullsize);
    }
  };

  const getLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={styles['image-finder']}>
      <SearchBar onSubmit={handleFormSubmit} />
      {status === 'pending' && <Loading />}
      {status === 'resolved' && (
        <ImageGallery images={images} onClick={handleClick} />
      )}
      {images.length > 11 && status === 'resolved' && (
        <>
          <Button
            name={'Load more'}
            nameClass="load-button"
            onClick={getLoadMore}
          />
          <Button name={'To UP'} nameClass="up-button" onClick={scrollTop} />
        </>
      )}
      {status === 'notFound' && <ImageNotFound />}
      {showModal && (
        <Modal onClose={handleClick} fullSize={fullSize} name={alt} />
      )}
    </div>
  );
};

export default ImageFinder;
