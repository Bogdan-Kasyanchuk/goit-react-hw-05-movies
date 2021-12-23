import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ name, nameClass, onClick }) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[nameClass]}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  nameClass: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
