import axios from 'axios';

const parameters = {
  KEY: '2137a92158482b923ce4391fcd3624bd',
  BASE_URL: 'https://api.themoviedb.org/3',
};

const { KEY, BASE_URL } = parameters;

async function fetchApi(url = '') {
  const response = await axios.get(url);
  if (response.status === 200) return response.data;
  throw new Error(response.status);
}

export function getTrending(page) {
  return fetchApi(`${BASE_URL}/trending/all/day?api_key=${KEY}&page=${page}`);
}

export function getMovie(query, page) {
  return fetchApi(
    `${BASE_URL}/search/movie?api_key=${KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`,
  );
}

export function getMovieInform(id) {
  return fetchApi(`${BASE_URL}/movie/${id}?api_key=${KEY}&language=en-US`);
}

export function getCredits(id) {
  return fetchApi(
    `${BASE_URL}/movie/${id}/credits?api_key=${KEY}&language=en-US`,
  );
}

export function getReviews(id, page) {
  return fetchApi(
    `${BASE_URL}/movie/${id}/reviews?api_key=${KEY}&language=en-US&page=${page}`,
  );
}
