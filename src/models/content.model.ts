import mongoose, { Schema } from "mongoose";

export const contentTypes = ["image", "video", "article", "audio"];

const ContentSchema = new Schema({
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
});

const ContentModel = mongoose.model("ContentModel", ContentSchema);

export default ContentModel;
