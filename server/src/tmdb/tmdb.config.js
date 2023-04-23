const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_BASE_URL;

const getUrl = (endpoint, params) => {
  const query = new URLSearchParams(params);

  return `${baseUrl}${endpoint}?api_keys=${key}&${query}`;
};

export default { getUrl };
