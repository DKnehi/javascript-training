import { validatePassword } from '../helpers/validation';
import { ERROR_MESSAGE } from '../constants/message';
import showToast from '../views/toast';

export const {
  REQUIRED_FIELD,
  REQUIRED_FIELD_PASSWORD,
  INVALID_PASSWORD,
} = ERROR_MESSAGE;

export default class UserView {
  constructor() {
    //Login page elements
    this.emailErrorEl = document.getElementById('emailError');
    this.emailFormEl = document.getElementById('email');
    this.loginFormEl = document.getElementById('loginForm');
    this.passwordErrorEl = document.getElementById('passwordError');
    this.passwordFormEl = document.getElementById('password');
  }

  //The function checks and sends the submit event for the login form
  bindFormLogin = (submitLogin) => {
    this.loginFormEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = this.emailFormEl.value;
      const password = this.passwordFormEl.value;

      this.emailErrorEl.textContent = '';
      this.passwordErrorEl.textContent = '';

      //Show an error if the user enters nothing
      if (!email) {
        this.emailErrorEl.textContent = `${REQUIRED_FIELD}`;
      }

      //Show an error if the user enters nothing
      if (!password) {
        this.passwordErrorEl.textContent = `${REQUIRED_FIELD_PASSWORD}`;

        return;
      }

      //Displays an error if the user enters the wrong password format
      if (!validatePassword(password)) {
        this.passwordErrorEl.textContent = `${INVALID_PASSWORD}`;

        return;
      }

      submitLogin(email, password);
    });

    this.emailFormEl.addEventListener('input', () => {
      this.emailErrorEl.textContent = '';
    });

    this.passwordFormEl.addEventListener('input', () => {
      this.passwordErrorEl.textContent = '';
    });
  };

  //Function displays a notification when the user logs in
  showLoginFailedMessage(message) {
    showToast(message, 'error');
  }

  redirectPage = (page) => {
    window.location.replace(page);
  };
}
