import {signUpDataType} from "../types/signUpDataTypes";
import {hashPassword} from "../utils/hashPassword";
import * as uuid from "uuid";
const UserModel = require("../models/UserModel");
const EmailTokenModel = require("../models/EmailTokenModel");

const createUser = async (data: signUpDataType) => {
  const result = {
    ok: true,
    data: {}
  }

  const hashedPassword = await hashPassword(data.password);
  const activationMailToken = uuid.v4();
  try {
    const user = await UserModel.create({...data, password: hashedPassword});
    const mailToken = await EmailTokenModel.create({ userId: user._id, confirmationToken: activationMailToken });
    result.data = {user, mailToken};
  } catch (e) {
    console.log(e);
    result.ok = false;
  }
  return result;
}

module.exports = {
  createUser
}
