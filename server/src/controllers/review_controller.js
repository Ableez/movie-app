import responseHandlers from "../handlers/response_handler.js";
import reviewModel from "../models/review_model.js";
const create = async (req, res) => {
  try {
    const { movieId } = req.params;
    const review = new reviewModel({
      user: req.user.id,
      movieId,
      ...req.body,
    });
    await review.save();
    responseHandlers.ok(res, {
      ...review._doc,
      id: review.id,
      user: req.user,
    });
  } catch {}
};
const remove = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await reviewModel.findOne({
      _id: reviewId,
      user: req.user.id,
    });
    if (!review) return responseHandlers.notfound(res);
    await review.remove();
    responseHandlers.ok(res);
  } catch {
    responseHandlers.err(res);
  }
};
const getReviewsOfUser = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({
        user: req.user.id,
      })
      .sort("-createAt");
    responseHandlers.ok(res, reviews);
  } catch {
    responseHandlers.err(res);
  }
};
export default {
  create,
  remove,
  getReviewsOfUser,
};
