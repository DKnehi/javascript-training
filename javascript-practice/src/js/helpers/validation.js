import { REGEX } from '../constants/regex';

validatePassword = (password) => {
  return REGEX.PASSWORD.test(password);
};

export { validatePassword };
