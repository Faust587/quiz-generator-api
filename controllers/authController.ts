import {Request, Response} from "express";
import {signUpDataType} from "../types/signUpDataTypes";
import {sendActivationMail} from "../services/mailService";
import {generateEmailConfirmationLink} from "../utils/generateLink";
const {signUpDataDTO} = require("../DTO/SignUpDataDTO");
const {signUpDataValidation} = require("../services/validationService");
const {createUser} = require("../services/userService");

const signUpController = async (req: Request, res: Response) => {
  const signUpData: signUpDataType = signUpDataDTO(req.body);
  const validationResult = await signUpDataValidation(signUpData);
  if (!validationResult.ok) {
    res.statusCode = 400;
    res.json(validationResult);
    return;
  }

  const {ok, data} = await createUser(signUpData);
  const {user, mailToken} = data;
  if (!ok) {
    res.statusCode = 500;
    res.json("SERVER ERROR");
    return;
  }

  const activationLink = generateEmailConfirmationLink(mailToken.confirmationToken);
  const sendingResult = await sendActivationMail(user.email, activationLink);
  if (!sendingResult) {
    console.log(2)
    res.statusCode = 500;
    res.json("SERVER ERROR");
    return;
  }
  res.json("SSSSSSSSSS")
}

const signInController = async (req: Request, res: Response) => {
  res.json("sign in execution");
}

const logOutController = async (req: Request, res: Response) => {
  res.json("log out execution");
}

const activateEmailController = async (req: Request, res: Response) => {
  res.json("activate email execution");
}

const refreshTokenController = async (req: Request, res: Response) => {
  res.json("refresh token execution");
}

module.exports = {
  signInController,
  signUpController,
  logOutController,
  activateEmailController,
  refreshTokenController
}
