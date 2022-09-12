export type UserDTOType = {
  _id: string,
  username: string,
  activated: boolean
}

export const createUserDTO = (userData: any): UserDTOType => {
  const userDTO: UserDTOType = {
    _id: "",
    username: "",
    activated: false
  }

  if (typeof userData._id === "string") {
    userDTO._id = userData._id;
  }

  if (typeof userData.username === "string") {
    userDTO.username = userData.username;
  }

  if (typeof userData.activated === "boolean") {
    userDTO.activated = userData.activated;
  }

  return userDTO;
}
