import mongoose, { Schema } from "mongoose";

const TagSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const TagModel = mongoose.model("TagModel", TagSchema);

export default TagModel;
