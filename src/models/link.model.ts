import mongoose, { Schema } from "mongoose";

const LinkSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LinkModel = mongoose.model("LinkModel", LinkSchema);

export default LinkModel;
