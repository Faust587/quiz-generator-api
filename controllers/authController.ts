import {Request, Response} from "express";

const signUpController = async (req: Request, res: Response) => {
  res.json("sign up execution");
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
