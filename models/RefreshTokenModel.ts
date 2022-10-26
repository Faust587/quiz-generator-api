import { model, Schema } from "mongoose";
import { ModelsName } from "../const/modelsName";

const refreshTokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: ModelsName.USER_MODEL,
      required: true,
      unique: false
    },
    refreshToken: {
      type: String,
      unique: true,
      required: true
    }
  },
  {
    versionKey: false
  }
);

export const RefreshTokenModel = model(ModelsName.REFRESH_TOKEN_MODEL, refreshTokenSchema);
