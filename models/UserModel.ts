import {Schema, model} from "mongoose";

export type userSchemaTypes = {
  username: string,
  email: string,
  password: string,
  activated: boolean
}

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: false, required: true },
    activated: { type: Boolean, unique: false, required: true, default: false }
  },
  {
    versionKey: false
  }
);

export const UserModel = model("User", userSchema);
