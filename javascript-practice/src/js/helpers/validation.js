import { Validation_Errors } from '../constants/message'
import { Regex } from '../constants/regex'

const { Required_Field, Invalid_Email, Invalid_Password } = Validation_Errors

const { EmailRegex, PasswordRegex } = Regex

const isRequired = value => (value !== '' ? '' : Required_Field);
const isEmail = value => EmailRegex.test(value) ? '' : Invalid_Email;
const isPassword = value => PasswordRegex.test(value) ? '' : Invalid_Password;


export {
  isEmail,
  isPassword,
  isRequired
}
