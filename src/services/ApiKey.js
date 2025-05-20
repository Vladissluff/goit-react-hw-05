import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGQ0MmEwYjJhZWM5NTFmNjM3NGJkZWYxZTZmOWM4NSIsIm5iZiI6MTc0Nzc1NzU4OS4yNDYsInN1YiI6IjY4MmNhYTE1MWFhNzBlNWMzODllM2ViYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eJGwm8-8icW84MFuwuXr7qcyRUmmlTSO4I5HH1cFcgw';

const options = {
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
};

export async function getTrendingMovies() {
  const res = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return res.data.results;
}

export async function searchMovies(query) {
  const res = await axios.get(`${BASE_URL}/search/movie`, {
    ...options,
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
  return res.data.results;
}

export async function getMovieDetails(id) {
  const res = await axios.get(`${BASE_URL}/movie/${id}`, options);
  return res.data;
}

export async function getMovieCredits(id) {
  const res = await axios.get(`${BASE_URL}/movie/${id}/credits`, options);
  return res.data.cast;
}

export async function getMovieReviews(id) {
  const res = await axios.get(`${BASE_URL}/movie/${id}/reviews`, options);
  return res.data.results;
}