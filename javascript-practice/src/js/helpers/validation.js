import { REGEX } from '../constants/regex';

/**
 * The validatePhoneNumber function is used to check whether a string phoneNumber matches the phone number format, using a predefined regular expression.
 * @param {string} phoneNumber - The phone number string to be validated.
 * @returns {boolean} - Returns true if the phone number matches the format, otherwise false.
 */
validatePhoneNumber = (phoneNumber) => {
  return REGEX.PHONE_NUMBER.test(phoneNumber);
};

/**
 * The validatePassword function is used to check whether a password string matches the password format.
 * @param {string} password - The password string to be validated.
 * @returns {boolean} - Returns true if the password matches the format, otherwise false.
 */
validatePassword = (password) => {
  return REGEX.PASSWORD.test(password);
};

/**
 * The validateConfirmPassword function is used to check whether the two strings password and confirmPassword match.
 * @param {string} password - The original password string.
 * @param {string} confirmPassword - The confirmation password string to be compared with the original password.
 * @returns {boolean} - Returns true if the password and confirmPassword match, otherwise false.
 */
validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

/**
 * The validateInputText function is used to check whether a text string matches the text format.
 * @param {string} text - The text string to be validated.
 * @returns {boolean} - Returns true if the text matches the format, otherwise false.
 */
validateInputText = (text) => {
  return REGEX.TEXT.test(text);
};

export {
  validatePassword,
  validateConfirmPassword,
  validatePhoneNumber,
  validateInputText,
};
