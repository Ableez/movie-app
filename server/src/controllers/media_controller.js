import response_handler from "../handlers/response_handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import userModel from "../models/user_models.js";
import reviewModel from "../models/review_model.js";
import token_middleware from "../middleware/token_middleware.js";
import favorite_model from "../models/favorite_model.js";

const getList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;
    const response = await tmdbApi.mediaList({
      mediaType,
      mediaCategory,
      page,
    });
    return response_handler.ok(res, response);
  } catch {
    response_handler.err(res);
  }
};

const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const response = await tmdbApi.mediaGenres({ mediaType });
    return response_handler.ok(res, response);
  } catch {
    response_handler.err(res);
  }
};
const search = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const {} = req.query;
    const response = await tmdbApi.mediaSearch({
      query,
      page,
      mediaType: mediaType === "people" ? "person" : mediaType,
    });
    response_handler.ok(res, response);
  } catch {
    response_handler.err(res);
  }
};
const getDetail = async (req, res) => {
  try {
    const params = { mediaType, mediaId };
    const media = await tmdbApi.mediaDetail(params);
    media.credits = await tmdbApi.mediaCredits(params);

    const videos = await tmdbApi.mediaVideos(params);
    media.videos = videos;

    const recommend = await tmdbApi.mediaRecommend(params);
    media.recommend = recommend.results;

    media.images = await tmdbApi.mediaImages(params);
    const tokenDecoded = token_middleware.tokenDecode(req);
    if (tokenDecoded) {
      const user = await userModel.findById(tokenDecoded.data);
      if (user) {
        const isFavorite = await favorite_model.findOne({
          user: user.id,
          mediaId,
        });
        media.isFavorite = isFavorite !== null;
      }
    }
    media.reviews = await reviewModel
      .find({ mediaId })
      .populate("user")
      .sort("-createdAt");
    response_handler.ok(res, media);
  } catch {
    response_handler.err(res);
  }
};

export default {
  getList,
  getDetail,
  getGenres,
  search,
};
