import { VALIDATE_ERORR } from '../constants/message'
import { REGEX } from '../constants/regex'

const { Required_Field, Invalid_Email, Invalid_Password } = VALIDATE_ERORR

const { EmailRegex, PasswordRegex } = REGEX

const isRequired = value => (value !== '' ? '' : Required_Field);
const isEmail = value => EmailRegex.test(value) ? '' : Invalid_Email;
const isPassword = value => PasswordRegex.test(value) ? '' : Invalid_Password;


export {
  isEmail,
  isPassword,
  isRequired
}
