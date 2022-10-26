import { verify } from "jsonwebtoken";

const JWT_ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY;
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;

if (typeof JWT_ACCESS_SECRET_KEY !== "string") throw "JWT_ACCESS_SECRET_KEY IS EMPTY!";
if (typeof JWT_REFRESH_SECRET_KEY !== "string") throw "JWT_REFRESH_SECRET_KEY IS EMPTY!";

export const validateAccessToken = (token: string) => {
  try {
    return verify(token, JWT_ACCESS_SECRET_KEY);
  } catch (e) {
    return null;
  }
}

export const validateRefreshToken = (token: string) => {
  try {
    return verify(token, JWT_REFRESH_SECRET_KEY);
  } catch (e) {
    return null;
  }
}
