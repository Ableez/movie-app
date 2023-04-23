import mongoose from "mongoose";
import crypto from "crypto";
import modelOption from "./model.options.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: string,
      required: true,
      unique: true,
    },
    displayName: {
      type: string,
      required: true,
    },
    password: {
      type: string,
      required: true,
      select: false,
    },
    salt: {
      type: string,
      required: true,
      select: false,
    },
  },
  modelOption
);

userSchema.methods.setPassword = (password) => {
  this.salt = crypto.randomBytes(16).toString("hex");

  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

userSchema.methods.validPassword = (password) => {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.password === hash;
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
