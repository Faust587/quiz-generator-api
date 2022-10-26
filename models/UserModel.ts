import { model, Schema } from "mongoose";
import { ModelsName } from "../const/modelsName";

export type userSchemaTypes = {
  username: string,
  email: string,
  password: string,
  activated: boolean
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: false,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    hashedPassword: {
      type: String,
      unique: false,
      required: true
    },
    activated: {
      type: Boolean,
      unique: false,
      required: true,
      default: false
    }
  },
  {
    versionKey: false
  }
);

export const UserModel = model(ModelsName.USER_MODEL, userSchema);
