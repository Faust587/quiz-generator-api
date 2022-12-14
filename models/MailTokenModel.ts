import { model, Schema } from "mongoose";
import { ModelsName } from "../const/modelsName";

const mailSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: ModelsName.USER_MODEL,
      required: true,
      unique: true
    },
    confirmationToken: {
      type: String,
      unique: true,
      required: true
    }
  },
  {
    versionKey: false
  }
);

export const MailTokenModel = model(ModelsName.MAIL_TOKEN_MODEL, mailSchema);
