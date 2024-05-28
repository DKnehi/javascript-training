export const REGEX = {
  //Must enter 6 characters including capital letters and special characters
  PASSWORD: /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/,
  PHONE_NUMBER: /^\+(?:[0-9] ?){6,14}[0-9]$/,
};
