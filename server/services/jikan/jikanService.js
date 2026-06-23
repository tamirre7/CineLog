const jikanClient = require('./jikanApi');

const jikanService = {
  /**
   * Search anime by name (Required for Phase 1 MVP search)
   * Matches the GET /api/search?q=... route
   * @param {string} query - The search term
   * @returns {Promise<Array>} List of anime results
   */
  searchAnime: async (query) => {
    try {
      const response = await jikanClient.get('/anime', {
        params: {
          q: query,
          limit: 10,
        },
      });

      // Return only the data array, abstracting away Jikan's specific response structure
      return response.data.data;
    } catch (error) {
      console.error(`[JikanService Error] Failed to search anime: ${query}`);
      throw error;
    }
  },

  /**
   * Get full details for a specific anime by its ID
   * Needed when we POST /api/media to fetch all missing details (genres, synopsis)
   * @param {number} externalId - The Jikan ID
   * @returns {Promise<Object>} Full anime details
   */
  getAnimeDetails: async (externalId) => {
    try {
      const response = await jikanClient.get(`/anime/${externalId}/full`);
      return response.data.data;
    } catch (error) {
      console.error(
        `[JikanService Error] Failed to fetch details for ID: ${externalId}`,
      );
      throw error;
    }
  },
};

module.exports = jikanService;
