export enum validationErrors {
  USERNAME_IS_NOT_VALID = "Username is not valid",
  USERNAME_IS_EMPTY = "Username is empty",
  USERNAME_IS_BUSY = "Username is busy",
  USERNAME_MUST_HAVE_MORE = "Username must have more then 2 symbols",
  USERNAME_MUST_HAVE_LESS = "Username must have less then 15 symbols",

  PASSWORD_IS_NOT_VALID = "Password is not valid",
  PASSWORD_IS_EMPTY = "Password is empty",
  PASSWORDS_ARE_NOT_THE_SAME = "Passwords are not the same",
  PASSWORD_MUST_HAVE_MORE = "Password must have more then 7 symbols",
  PASSWORD_MUST_HAVE_LESS = "Password must have less then 15 symbols",
  PASSWORD_MUST_HAVE_DIGIT = "Password should contain at least one digit",
  PASSWORD_MUST_HAVE_LOWER_CASE = "Password should contain at least one lower case",
  PASSWORD_MUST_HAVE_UPPER_CASE = "Password should contain at least one upper case",

  EMAIL_IS_NOT_VALID = "Email is not valid",
  EMAIL_IS_BUSY = "Email is busy"
}
