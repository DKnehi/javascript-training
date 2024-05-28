export const REGEX = {
  //Must enter 6 characters including capital letters and special characters
  PASSWORD: /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/,
  //Must be in the correct international phone number format
  PHONE_NUMBER: /^\+(?:[0-9] ?){6,14}[0-9]$/,
  //Cannot contain numbers
  TEXT: /^[^\d]+$/,
};
