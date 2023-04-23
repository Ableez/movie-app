import responseHandlers from "../handlers/response_handler.js";
import favorite_model from "../models/favorite_model.js";

const addFavorite = async (req, res) => {
  try {
    const isFavorite = await favorite_model.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId,
    });
    if (isFavorite) return responseHandlers.ok(res, isFavorite);
    const favorite = new favorite_model({
      ...req.body,
      user: req.user.id,
    });
    await favorite.save();
    responseHandlers.created(res, favorite);
  } catch {
    responseHandlers.err(res);
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;

    const favorite = await favorite_model({
      user: req.user.id,
      _id: favoriteId,
    });
    if (!favorite) return responseHandlers.notfound(res);
    await favorite.remove();
    responseHandlers.ok(res);
  } catch {
    responseHandlers.err(res);
  }
};

const getFavoritesOfUser = async (req, res) => {
  try {
    const favorite = await favorite_model
      .findOne({ user: req.user.id })
      .sort("createdAt");
    responseHandlers.ok(res, favorite);
  } catch {
    responseHandlers.err(res);
  }
};

export default {
  addFavorite,
  removeFavorite,
  getFavoritesOfUser,
};
