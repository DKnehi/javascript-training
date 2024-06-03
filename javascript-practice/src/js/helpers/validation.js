import { REGEX } from '../constants/regex';

//The validatePhoneNumber function is used to check whether a string phoneNumber matches the phone number format, using a predefined regular expression.
validatePhoneNumber = (phoneNumber) => {
  return REGEX.PHONE_NUMBER.test(phoneNumber);
};

//The validatePassword function is used to check whether a password string matches the password format.
validatePassword = (password) => {
  return REGEX.PASSWORD.test(password);
};

//The validateConfirmPassword function is used to check whether the two strings password and confirmPassword match.
validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

//The validateInputText function is used to check whether a text string matches the text format.
validateInputText = (text) => {
  return REGEX.TEXT.test(text);
};

export {
  validatePassword,
  validateConfirmPassword,
  validatePhoneNumber,
  validateInputText,
};
