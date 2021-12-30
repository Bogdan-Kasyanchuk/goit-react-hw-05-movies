import Loader from 'react-loader-spinner';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles['loading-wrapper']}>
      <Loader type="Watch" color="#3f51b5" height={200} width={200} />;
    </div>
  );
};

export default Loading;
