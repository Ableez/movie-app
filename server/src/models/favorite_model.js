import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "Favorite",
  mongoose.Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        unique: true,
      },
      content: {
        type: string,
        required: true,
      },
      mediaType: {
        type: string,
        enum: ["tv", "movie"],
        required: true,
      },
      mediaTitle: {
        type: string,
        required: true,
      },
      mediaPoster: {
        type: string,
        required: true,
      },
      mediaRate: {
        type: Number,
        required: true,
      },
    },
    mediaOptions
  )
);
