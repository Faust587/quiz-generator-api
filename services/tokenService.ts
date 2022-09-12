import * as jwt from "jsonwebtoken";
import {UserDTOType} from "../DTO/UserDTO";
import {RefreshTokenModel} from "../models/TokenModel";

const JWT_ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY;
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;

export const generateTokens = (userPayload: UserDTOType) => {
  const accessToken = jwt.sign(userPayload, JWT_ACCESS_SECRET_KEY, {expiresIn: "60s"});
  const refreshToken = jwt.sign(userPayload, JWT_REFRESH_SECRET_KEY, {expiresIn: "30d"});
  return {accessToken, refreshToken}
}

export const saveRefreshToken = async (userId: string, token: string) => {
  const result = {
    ok: true
  }

  try {
    await RefreshTokenModel.create({userId, refreshToken: token});
  } catch (e) {
    console.log(e);
    result.ok = false;
  }
  return result;
}
