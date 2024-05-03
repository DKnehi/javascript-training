import {ERROR_MESSAGE} from '../constants/message'
import { REGEX } from '../constants/regex'

const { REQUIRED_FIELD, INVALID_EMAIL, INVALID_PASSWORD } = ERROR_MESSAGE

const { REQUIRD_FIELD,  EMAIL, PASSWORD } = REGEX

export const isRequired = value => REQUIRD_FIELD.test (value !== '' ? '' : REQUIRED_FIELD);
export const isEmail = value => EMAIL.test(value) ? '' : INVALID_EMAIL;
export const isPassword = value => PASSWORD.test(value) ? '' : INVALID_PASSWORD;

