import { UserDTOType } from "../DTO/UserDTO";

export type serviceResultTypes<ErrorsType> = {
  ok: boolean,
  errors: ErrorsType[];
}

export type refreshingTokenType = {
  ok: boolean,
  tokens: {
    accessToken: string,
    refreshToken: string
  },
  user: UserDTOType
}
