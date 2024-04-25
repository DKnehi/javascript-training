const REGEX = {
  RequiredFieldRegex: /^.*\S+.*$/,
  EmailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PasswordRegex: /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/,
}
export default REGEX;
