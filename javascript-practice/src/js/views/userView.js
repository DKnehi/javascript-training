import { validatePassword } from '../helpers/validation';
import { ERROR_MESSAGE } from '../constants/message';
import showToast from '../views/toast';

export const {
  REQUIRED_FIELD_EMAIL,
  REQUIRED_FIELD_PASSWORD,
  INVALID_PASSWORD,
} = ERROR_MESSAGE;

export default class UserView {
  constructor() {
    this.emailErrorEl = document.getElementById('emailError');
    this.emailFormEl = document.getElementById('email');
    this.loginFormEl = document.getElementById('loginForm');
    this.passwordErrorEl = document.getElementById('passwordError');
    this.passwordFormEl = document.getElementById('password');
  }

  bindFormLogin = (submitLogin) => {
    this.loginFormEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const Email = this.emailFormEl.value;
      const Password = this.passwordFormEl.value;

      this.emailErrorEl.textContent = '';
      this.passwordErrorEl.textContent = '';

      //Show an error if the user enters nothing
      if (!Email) {
        this.emailErrorEl.textContent = `${REQUIRED_FIELD_EMAIL}`;
      }

      //Show an error if the user enters nothing
      if (!Password) {
        this.passwordErrorEl.textContent = `${REQUIRED_FIELD_PASSWORD}`;

        return;
      }

      //Displays an error if the user enters the wrong password format
      if (!validatePassword(Password)) {
        this.passwordErrorEl.textContent = `${INVALID_PASSWORD}`;

        return;
      }

      submitLogin(Email, Password);
    });

    this.emailFormEl.addEventListener('input', () => {
      this.emailErrorEl.textContent = '';
    });

    this.passwordFormEl.addEventListener('input', () => {
      this.passwordErrorEl.textContent = '';
    });
  };

  showLoginFailedMessage(message) {
    showToast(message, 'error');
  }

  redirectPage = (page) => {
    window.location.replace(page);
  };
}
