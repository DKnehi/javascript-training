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

validateInputLength = (value) => {
  return value.length > 2;
};

export {
  validatePassword,
  validateConfirmPassword,
  validatePhoneNumber,
  validateInputLength,
};
