import { REGEX } from '../constants/regex'

const { PASSWORD } = REGEX

validatePassword = (password) => {
  return PASSWORD.test(password);
}

export { validatePassword };
