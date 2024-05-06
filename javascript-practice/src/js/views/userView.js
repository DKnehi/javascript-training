import { validatePassword } from '../helpers/validation';
import { ERROR_MESSAGE } from '../constants/message';

export const {
  REQUIRED_FIELD_EMAIL,
  REQUIRED_FIELD_PASSWORD,
  INVALID_EMAIL,
  INVALID_PASSWORD,
} = ERROR_MESSAGE;

export default class UserView {
  constructor() {
    this.loginFormEl = document.getElementById('login-form');
    this.emailFormEl = document.getElementById('email');
    this.passwordFormEl = document.getElementById('password');
    this.emailErrorEl = document.getElementById('email-error');
    this.passwordErrorEl = document.getElementById('password-error');
  }

  bindFormLogin = (submitLogin) => {
    this.loginFormEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const valueEmail = this.emailFormEl.value;
      const valuePassword = this.passwordFormEl.value;

      this.emailErrorEl.textContent = '';
      this.passwordErrorEl.textContent = '';

      if (!valueEmail) {
        this.emailErrorEl.textContent = `${REQUIRED_FIELD_EMAIL}`;
      }

      if (!valuePassword) {
        this.passwordErrorEl.textContent = `${REQUIRED_FIELD_PASSWORD}`;

        return;
      }

      if (!validatePassword(valuePassword)) {
        this.passwordErrorEl.textContent = `${INVALID_PASSWORD}`;

        return;
      }

      submitLogin(valueEmail, valuePassword);
    })

    this.emailFormEl.addEventListener('input', () => {
      this.emailErrorEl.textContent = '';
    })
    this.passwordFormEl.addEventListener('input', () => {
      this.passwordErrorEl.textContent = '';
    })
  };

  redirectPage = (page) => {
    window.location.replace(page);
  };
};
