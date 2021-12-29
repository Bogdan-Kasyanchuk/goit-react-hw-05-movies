import PropTypes from 'prop-types';
import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import Toastify from 'components/Toastify';
// import styles from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = event => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      Toastify('warning', 'Enter the name of the movie!');
    } else {
      onSubmit(searchQuery.trim());
      setSearchQuery('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">
        <ImSearch style={{ width: 22, height: 22 }} />
      </button>
      <input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        value={searchQuery}
        onChange={handleChange}
      />
    </form>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
