import responseHandlers from "../handlers/response_handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
const personDetail = async (req, res) => {
  try {
    const { personId } = req.params;
    const person = await tmdbApi.personDetail({ personId });
    responseHandlers.ok(res, person);
  } catch {
    responseHandlers.err(res);
  }
};
const personMedias = async (req, res) => {
  try {
    const { personId } = req.params;
    const medias = await tmdbApi.personMedias({ personId });
    responseHandlers.ok(res, medias);
  } catch {}
};
export default {
  personDetail,
  personMedias,
};
