import axios from 'axios';

const parameters = {
  KEY: '2137a92158482b923ce4391fcd3624bd',
  BASE_URL: 'https://api.themoviedb.org/3',
};

async function fetchApi(url = '', config = {}) {
  const response = await axios.get(url, config);
  if (response.status === 200) return response.data;
  throw new Error(response.status);
}

export function getTrending() {
  return fetchApi(
    `${parameters.BASE_URL}/trending/all/day?api_key=${parameters.KEY}`,
  );
}

export function getMovie(query, page) {
  return fetchApi(
    `${parameters.BASE_URL}/search/movie?api_key=${parameters.KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`,
  ).then(data => console.log(data.results));
}

export function getMovieInform(id) {
  return fetchApi(
    `${parameters.BASE_URL}/movie/${id}?api_key=${parameters.KEY}&language=en-US`,
  ).then(data => console.log(data));
}

export function getCredits(id) {
  return fetchApi(
    `${parameters.BASE_URL}/movie/${id}/credits?api_key=${parameters.KEY}&language=en-US`,
  ).then(data => console.log(data.cast));
}

export function getReviews(id) {
  return fetchApi(
    `${parameters.BASE_URL}/movie/${id}/reviews?api_key=${parameters.KEY}&language=en-US&page=1`,
  ).then(data => console.log(data.results));
}
