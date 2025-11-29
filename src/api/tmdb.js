const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function getPopularMovies() {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`;

  const response = await fetch(url);
  const data = await response.json();

  return data.results || [];
}

export async function searchMovies(query) {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}`;

  const response = await fetch(url);
  const data = await response.json();

  return data.results || [];
}
