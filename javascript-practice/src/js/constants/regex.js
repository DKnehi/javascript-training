export const REGEX = {
  //Must enter 6 characters including capital letters and special characters
  PASSWORD: /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/,
  //Must be in the correct international phone number format
  PHONE_NUMBER: /^0[0-9]{9,10}$/,
  //Cannot contain numbers
  TEXT: /^(?!.*\d).+$/,
};
