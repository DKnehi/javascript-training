import { validatePassword } from '../helpers/validation';
import { ERROR_MESSAGE } from '../constants/message';
import showToast from '../views/toast';

//Error messages from ERROR_MESSAGE constant
export const {
  REQUIRED_FIELD,
  REQUIRED_FIELD_PASSWORD,
  INVALID_PASSWORD,
} = ERROR_MESSAGE;

export default class UserView {
  constructor() {
    // DOM elements for login form
    this.emailErrorEl = document.getElementById('emailError');
    this.emailFormEl = document.getElementById('email');
    this.loginFormEl = document.getElementById('loginForm');
    this.passwordErrorEl = document.getElementById('passwordError');
    this.passwordFormEl = document.getElementById('password');
  }

  /**
   * The function binds the login form submit event to the provided callback.
   * It validates the input fields and displays error messages if validation fails.
   * @param {function} submitLogin - The callback function to handle form submission.
   */
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

      // Call the provided submitLogin callback with email and password
      submitLogin(email, password);
    });

    // Clear email error message on input
    this.emailFormEl.addEventListener('input', () => {
      this.emailErrorEl.textContent = '';
    });

    // Clear password error message on input
    this.passwordFormEl.addEventListener('input', () => {
      this.passwordErrorEl.textContent = '';
    });
  };

  /**
   * Displays a toast message when the login fails.
   * @param {string} message - The message to be displayed.
   */
  showLoginFailedMessage(message) {
    showToast(message, 'error');
  }

  /**
   * Redirects the user to a specified page.
   * @param {string} page - The URL of the page to redirect to.
   */
  redirectPage = (page) => {
    window.location.replace(page); // Redirect to the specified page
  };
}
