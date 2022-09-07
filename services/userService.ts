import {signUpDataType} from "../types/signUpDataTypes";
import {hashPassword} from "../utils/hashPassword";
import * as uuid from "uuid";
import {userSchemaTypes, UserModel} from "../models/UserModel";
import {MailTokenModel} from "../models/MailTokenModel";

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
    const user = await UserModel.create({...data, password: hashedPassword});
    const mailToken = await MailTokenModel.create({ userId: user._id, confirmationToken: activationMailToken });
    if (typeof mailToken.confirmationToken === "string") {
      result.data = {user, mailToken: mailToken.confirmationToken};
    } else {
      result.ok = false;
    }
  } catch (e) {
    console.log(e); // TODO: create logger here
    result.ok = false;
  }
  return result;
}

const activateMail = async (token: string) => {
  const result = {
    ok: true,
    errors: []
  }
  const mailToken = MailTokenModel.findOne({confirmationToken: token});

  if (!mailToken) {

  }
}
