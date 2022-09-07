import {Request, Response} from "express";
import {signUpDataType} from "../types/signUpDataTypes";
import {sendActivationMail} from "../services/mailService";
import {generateEmailConfirmationLink} from "../utils/generateLink";
import {signUpDataDTO} from "../DTO/SignUpDataDTO";
import {signUpDataValidation} from "../services/validationService";
import {createUser} from "../services/userService";

export const signUpController = async (req: Request, res: Response) => {
  const signUpData: signUpDataType = signUpDataDTO(req.body);
  const validationResult = await signUpDataValidation(signUpData);
  if (!validationResult.ok) {
    res.statusCode = 400;
    res.json(validationResult);
    return;
  }

  const {ok, data} = await createUser(signUpData);
  const {user, mailToken} = data;
  if (!ok || !user || !mailToken) {
    res.statusCode = 500;
    res.json("SERVER ERROR");
    return;
  }

  const activationLink = generateEmailConfirmationLink(mailToken);
  const sendingResult = await sendActivationMail(user.email, activationLink);
  if (!sendingResult) {
    res.statusCode = 500;
    res.json("SERVER ERROR");
    return;
  }
  res.json("SSSSSSSSSS")
}

export const signInController = async (req: Request, res: Response) => {
  res.json("sign in execution");
}

export const logOutController = async (req: Request, res: Response) => {
  res.json("log out execution");
}

export const activateEmailController = async (req: Request, res: Response) => {
  res.json("activate email execution");
}

export const refreshTokenController = async (req: Request, res: Response) => {
  res.json("refresh token execution");
}
