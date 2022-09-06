import {Schema, model} from "mongoose";

const emailSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    confirmationToken: { type: String, unique: true, required: true }
  },
  {
    versionKey: false

  }
);

module.exports = model("Email", emailSchema);
