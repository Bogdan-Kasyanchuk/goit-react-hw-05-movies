import imgNotFound from '../../images/not-found.jpg';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div>
      <img className={styles.wrapper} src={imgNotFound} alt="Not found" />
    </div>
  );
};

export default NotFound;
