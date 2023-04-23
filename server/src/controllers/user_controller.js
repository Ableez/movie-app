import jsonwebtoken from "jsonwebtoken";
import userModel from "../models/user_models.js";
import reponseHandler from "../handlers/response_handler.js";
import response_handler from "../handlers/response_handler.js";

const signup = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;
    const checkUser = await userModel.findOne({ username });
    if (checkUser)
      return reponseHandler.badRequest(res, "username already exists");
    const user = new userModel();
    user.displayName = displayName;
    user.username = username;
    user.setPassword(password);
    await user.save();
    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );
    user.password = undefined;
    user.salt = undefined;
    response_handler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    response_handler.err(res);
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel
      .findOne({ username })
      .select("username password salt id displayName");
    if (!user) return response_handler.badRequest(res, "User does not exists");
    if (!user.validPassword(password))
      return response_handler.badRequest(res, "Wrong password");
  } catch {}
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const user = await userModel
      .findById(req.user.id)
      .select("password id salt");
    if (!user) return response_handler.unauthorized(res);
    if (!user.validPassword(password))
      return response_handler.badRequest(res, "Wrong Password");
    user.setPassword(newPassword);
    await user.save();
    reponseHandler.ok(res);
  } catch {
    response_handler.err(res);
  }
};

const getInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) return response_handler.notfound(res);
    response_handler.ok(res, user);
  } catch {
    response_handler.err(res);
  }
};

export default {
  signin,
  signup,
  getInfo,
  updatePassword,
};
