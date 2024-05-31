import { REGEX } from '../constants/regex';

validatePhoneNumber = (phoneNumber) => {
  return REGEX.PHONE_NUMBER.test(phoneNumber);
};

validatePassword = (password) => {
  return REGEX.PASSWORD.test(password);
};

validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

validateInputText = (text) => {
  return REGEX.TEXT.test(text)
};


export {
  validatePassword,
  validateConfirmPassword,
  validatePhoneNumber,
  validateInputText,
};
