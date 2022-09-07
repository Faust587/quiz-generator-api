import {signUpDataType} from "../types/signUpDataTypes";
import {serviceResultTypes} from "../types/serviceResultTypes";
import {validationErrors} from "../types/errors";

import {UserModel} from "../models/UserModel";

export const signUpDataValidation = async (data: signUpDataType) => {
  const result: serviceResultTypes<validationErrors> = {
    ok: true,
    errors: []
  }

  const isUsernameValid = await usernameValidation(data.username);
  if (!isUsernameValid.ok) {
    result.ok = false;
    result.errors = [...result.errors, ...isUsernameValid.errors];
  }

  const isPasswordValid = passwordValidation(data.password);
  if (!isPasswordValid.ok) {
    result.ok = false;
    result.errors = [...result.errors, ...isPasswordValid.errors];
  }

  if (data.password !== data.repeatedPassword) {
    result.ok = false;
    result.errors.push(validationErrors.PASSWORDS_ARE_NOT_THE_SAME);
  }

  const isEmailValid = await emailValidation(data.email);
  if (!isEmailValid.ok) {
    result.ok = false;
    result.errors = [...result.errors, ...isEmailValid.errors];
  }

  return result;
}

const emailValidation = async (email: string) => {
  const result: serviceResultTypes<validationErrors> = {
    ok: true,
    errors: []
  }

  const emailRegExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  if (!emailRegExp.test(email)) {
    result.ok = false;
    result.errors.push(validationErrors.EMAIL_IS_NOT_VALID);
  }

  const isEmailExists = await UserModel.findOne({email});
  if (isEmailExists) {
    result.ok = false;
    result.errors.push(validationErrors.EMAIL_IS_BUSY);
  }

  return result;
}

const usernameValidation = async (username: string) => {
  const result: serviceResultTypes<validationErrors> = {
    ok: true,
    errors: []
  }

  if (!username.length) {
    result.ok = false;
    result.errors.push(validationErrors.USERNAME_IS_EMPTY);
    return result;
  }

  const isUsernameExists = await UserModel.findOne({username});
  if (isUsernameExists) {
    result.ok = false;
    result.errors.push(validationErrors.USERNAME_IS_BUSY);
    return result;
  }

  if (username.length < 3) {
    result.ok = false;
    result.errors.push(validationErrors.USERNAME_MUST_HAVE_MORE);
    return result;
  }

  if (username.length > 14) {
    result.ok = false;
    result.errors.push(validationErrors.USERNAME_MUST_HAVE_LESS);
    return result;
  }

  const checkUsername = new RegExp(/^[a-zA-Z0-9]+$/);
  if (!checkUsername.test(username)) {
    result.ok = false;
    result.errors.push(validationErrors.USERNAME_IS_NOT_VALID);
  }

  return result;
}

const passwordValidation = (password: string): serviceResultTypes<validationErrors> => {
  const result: serviceResultTypes<validationErrors> = {
    ok: true,
    errors: []
  }

  const passwordLength = password.length;

  if (!passwordLength) {
    result.ok = false;
    result.errors.push(validationErrors.PASSWORD_IS_EMPTY);
  }

  if (passwordLength < 8) {
    result.ok = false;
    result.errors.push(validationErrors.PASSWORD_MUST_HAVE_MORE);
    return result;
  }

  if (passwordLength > 14) {
    result.ok = false;
    result.errors.push(validationErrors.PASSWORD_MUST_HAVE_LESS);
    return result;
  }

  const checkDigit = new RegExp(/(?=.*\d)/);
  const checkLowerCase = new RegExp(/(?=.*[a-z])/);
  const checkUpperCase = new RegExp(/(?=.*[A-Z])/);

  const isDigit = checkDigit.test(password);
  if (!isDigit) {
    result.ok = false;
    result.errors.push(validationErrors.PASSWORD_MUST_HAVE_DIGIT);
  }

  const isLowerCase = checkLowerCase.test(password);
  if (!isLowerCase) {
    result.ok = false;
    result.errors.push(validationErrors.PASSWORD_MUST_HAVE_LOWER_CASE);
  }

  const isUpperCase = checkUpperCase.test(password);
  if (!isUpperCase) {
    result.ok = false;
    result.errors.push(validationErrors.PASSWORD_MUST_HAVE_UPPER_CASE);
  }

  return result;
}
