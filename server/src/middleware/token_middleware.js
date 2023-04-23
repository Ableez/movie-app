import jsonwebtoken from "jsonwebtoken";
import response_handler from "../handlers/response_handler.js";
import userModel from "../models/user_models.js";

const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers["Authorization"];

    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];

      return jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    }
    return false;
  } catch {
    return false;
  }
};

const auth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  if (!tokenDecoded) return response_handler.unauthorized(res);
  const user = await userModel.findById(tokenDecoded.data);
  if (!user) return response_handler.unauthorized(res);
  req.user = user;
  next();
};

export default { auth, tokenDecode };
