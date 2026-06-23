const axios = require('axios');

// Create a pre-configured Axios instance for the TMDB API
const tmdbClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    // Inject the authentication token from environmental variables
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
});

// Global error handler for TMDB requests
tmdbClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`[TMDB API Error] Status: ${error.response.status}`);
      if (error.response.status === 401) {
        console.error('Invalid TMDB API key. Check your .env file.');
      }
    }
    return Promise.reject(error);
  },
);

module.exports = tmdbClient;
