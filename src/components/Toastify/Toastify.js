import PropTypes from 'prop-types';
import { Slide, toast } from 'react-toastify';

const Toastify = (type, nameToastify) =>
  toast(nameToastify, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    transition: Slide,
    type: type,
  });

Toastify.propTypes = {
  type: PropTypes.string.isRequired,
  nameToastify: PropTypes.string.isRequired,
};

export default Toastify;
