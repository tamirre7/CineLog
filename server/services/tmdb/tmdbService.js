const tmdbClient = require('./tmdbApi');

const tmdbService = {
  /**
   * Search movies/tv shows by name (Future readiness for Phase 2)
   * @param {string} query - The search term
   * @returns {Promise<Array>} List of media results
   */
  searchMedia: async (query) => {
    try {
      const response = await tmdbClient.get('/search/multi', {
        params: {
          query: query,
          include_adult: false,
        },
      });

      return response.data.results;
    } catch (error) {
      console.error(`[TMDBService Error] Failed to search media: ${query}`);
      throw error;
    }
  },

  /**
   * Get full details for a specific movie or TV show by its TMDB ID
   * @param {string|number} id - The TMDB ID
   * @param {string} type - 'movie' or 'tv'
   * @returns {Promise<Object>} Full media details
   */
  getDetails: async (id, type) => {
    try {
      // TMDB requires the type in the URL
      const response = await tmdbClient.get(`/${type}/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `[TMDBService Error] Failed fetching details for ${type} ID: ${id}`,
      );
      throw error;
    }
  },
};

module.exports = tmdbService;
s;
