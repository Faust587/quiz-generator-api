import {Schema, model} from "mongoose";

const refreshTokenSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    refreshToken: { type: String, unique: true, required: true }
  },
  {
    versionKey: false
  }
);

export const RefreshTokenModel = model("Token", refreshTokenSchema);
