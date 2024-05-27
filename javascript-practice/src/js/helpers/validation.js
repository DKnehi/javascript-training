import { REGEX } from '../constants/regex';

validateEmail = (email) => {
  return REGEX.EMAIL.test(email);
};

validatePhoneNumber = (phoneNumber) => {
  return REGEX.PHONE_NUMBER.test(phoneNumber);
};

validatePassword = (password, confirmPassword) => {
  if (!REGEX.PASSWORD.test(password)) {
    return false;
  }
  if (password !== confirmPassword) {
    return false;
  }
  return true;
};

validateInputLength = (value) => {
  return value.length > 3;
};

export {
  validatePassword,
  validateEmail,
  validatePhoneNumber,
  validateInputLength,
};
