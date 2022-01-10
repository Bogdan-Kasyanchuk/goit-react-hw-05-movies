import { Slide, toast } from 'react-toastify';

const toastify = (type, nameToastify) =>
  toast(nameToastify, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    transition: Slide,
    type: type,
  });

export default toastify;
