import {Schema, model} from "mongoose";

const mailSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    confirmationToken: { type: String, unique: true, required: true }
  },
  {
    versionKey: false
  }
);

export const MailTokenModel = model("MailToken", mailSchema);
