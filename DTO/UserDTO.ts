export type UserDTOType = {
  id: string,
  username: string,
  activated: boolean
}

export const createUserDTO = (userData: any): UserDTOType => {
  const userDTO: UserDTOType = {
    id: "",
    username: "",
    activated: false
  }

  if (typeof userData.id === "string") {
    userDTO.id = userData.id;
  }

  if (typeof userData.username === "string") {
    userDTO.username = userData.username;
  }

  if (typeof userData.activated === "boolean") {
    userDTO.activated = userData.activated;
  }

  return userDTO;
}
