import mongoose, { Schema } from "mongoose";

export const contentTypes = ["Tweet", "Video", "Document", "Link"];

const ContentSchema = new Schema(
  {
    link: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: contentTypes,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.String,
        ref: "TagModel",
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    content: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ContentModel = mongoose.model("ContentModel", ContentSchema);

export default ContentModel;
