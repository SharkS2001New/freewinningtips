const { default: api } = require("./api");

async function fetchMultibetsGames(fixture_date, options = {}) {
  try {
    const response = await api.get("/fetch_daily_multibet_games", {
      params: {
        fixture_date: fixture_date,
        category: options.category || "vip",
        site: options.site || "freetips",
      },
    });

    return {
      ...response.data,
      data: Array.isArray(response.data?.data) ? response.data.data : [],
    };
  } catch (error) {
    const serverErrors = error.response?.data || error.message;
    console.error("Error fetching games:", serverErrors);
    return { status: false, data: [] };
  }
}

export default fetchMultibetsGames;
