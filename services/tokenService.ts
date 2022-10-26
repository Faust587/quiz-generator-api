import { sign } from "jsonwebtoken";
import { createUserDTO, UserDTOType } from "../DTO/UserDTO";
import { RefreshTokenModel } from "../models/RefreshTokenModel";
import { validateRefreshToken } from "../utils/tokenValidation";
import { UserModel } from "../models/UserModel";
import { userPayloadType } from "../types/userPayload";
import { refreshingTokenType } from "../types/serviceResultTypes";

const JWT_ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY;
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;

if (typeof JWT_ACCESS_SECRET_KEY !== "string") throw "JWT_ACCESS_SECRET_KEY IS EMPTY!";
if (typeof JWT_REFRESH_SECRET_KEY !== "string") throw "JWT_REFRESH_SECRET_KEY IS EMPTY!";

export const generateTokens = (userPayload: UserDTOType) => {
  const accessToken = sign(userPayload, JWT_ACCESS_SECRET_KEY, { expiresIn: "60s" });
  const refreshToken = sign(userPayload, JWT_REFRESH_SECRET_KEY, { expiresIn: "30d" });
  return { accessToken, refreshToken };
}

export const saveRefreshToken = async (userId: string, token: string) => {
  const result = {
    ok: true
  }
  try {
    await RefreshTokenModel.create({ userId, refreshToken: token });
  } catch (e) {
    console.log(e);
    result.ok = false;
  }
  return result;
}

export const refreshingToken = async (token: string) => {
  const result = {} as refreshingTokenType;

  if (!token) {
    result.ok = false;
    return result;
  }

  const userPayload = validateRefreshToken(token) as userPayloadType;
  if (!userPayload) {
    result.ok = false;
    return result;
  }

  const user = await UserModel.findOne({ _id: userPayload.id });
  const existedToken = await RefreshTokenModel.findOne({ refreshToken: token });
  if (!user || !existedToken) {
    result.ok = false;
    return result;
  }

  const userDTO = createUserDTO(user);
  const { accessToken, refreshToken } = generateTokens(userDTO);
  result.tokens.accessToken = accessToken;
  result.tokens.refreshToken = refreshToken;
  result.user = userDTO;
  return result;
}
