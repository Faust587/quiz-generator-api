import { signUpDataType } from "../types/signUpDataTypes";
import { hashPassword } from "../utils/hashPassword";
import * as uuid from "uuid";
import { UserModel, userSchemaTypes } from "../models/UserModel";
import { MailTokenModel } from "../models/MailTokenModel";
import { serviceResultTypes } from "../types/serviceResultTypes";
import { mailActivationErrors } from "../types/errors";

type DataTypes = {
  user: userSchemaTypes | undefined,
  mailToken: string | undefined;
}

type resultTypes = {
  ok: boolean,
  data: DataTypes
}

export const createUser = async (data: signUpDataType): Promise<resultTypes> => {
  const result: resultTypes = {
    ok: true,
    data: {
      user: undefined,
      mailToken: undefined
    }
  }

  const hashedPassword = await hashPassword(data.password);
  const activationMailToken = uuid.v4();
  try {
    const user = await UserModel.create({ ...data, password: hashedPassword });
    const mailToken = await MailTokenModel.create({ userId: user._id, confirmationToken: activationMailToken });
    if (typeof mailToken.confirmationToken === "string") {
      result.data = { user, mailToken: mailToken.confirmationToken };
    } else {
      result.ok = false;
    }
  } catch (e) {
    console.log(e); // TODO: create logger here
    result.ok = false;
  }
  return result;
}

export const activateMail = async (token: string) => {
  const result: serviceResultTypes<mailActivationErrors> = {
    ok: true,
    errors: []
  }

  const mailToken = await MailTokenModel.findOneAndDelete({ confirmationToken: token });
  if (!mailToken) {
    result.ok = false;
    result.errors.push(mailActivationErrors.TOKEN_IS_NOT_EXISTS);
    return result;
  }

  const user = await UserModel.findByIdAndUpdate(mailToken.userId, { activated: true });
  if (!user) {
    result.ok = false;
    result.errors.push(mailActivationErrors.USER_IS_NOT_EXISTS);
    return result;
  }

  return result;
}
