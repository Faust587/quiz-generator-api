import {signUpDataType} from "../types/signUpDataTypes";

type dataType = {
  username: unknown,
  email: unknown,
  password: unknown,
  repeatedPassword: unknown
}

export const signUpDataDTO = (data: dataType): signUpDataType => {
  const userData: signUpDataType = {
    username: "",
    email: "",
    password: "",
    repeatedPassword: ""
  }

  if (typeof data.username === "string") {
    userData.username = data.username.trim();
  }

  if (typeof data.email === "string") {
    userData.email = data.email.trim();
  }

  if (typeof data.password === "string") {
    userData.password = data.password.trim();
  }

  if (typeof data.repeatedPassword === "string") {
    userData.repeatedPassword = data.repeatedPassword.trim();
  }

  return userData;
}
