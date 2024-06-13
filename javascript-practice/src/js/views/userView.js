import { ERROR_MESSAGE } from '../constants/message';
import showToast from '../views/toast';

//Error messages from ERROR_MESSAGE constant
const { REQUIRED_FIELD, REQUIRED_FIELD_PASSWORD } = ERROR_MESSAGE;

export default class UserView {
  constructor() {
    // DOM elements for login form
    this.loginFormEl = document.getElementById('loginForm');
    this.emailFormEl = this.loginFormEl.querySelector('input[name="email"]');
    this.emailErrorEl = this.emailFormEl.nextElementSibling;
    this.passwordFormEl = this.loginFormEl.querySelector('input[name="password"]');
    this.passwordErrorEl = this.passwordFormEl.nextElementSibling;
    this.submitButtonEl = this.loginFormEl.querySelector('.primary-button');
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

      // Clear previous error messages
      this.emailErrorEl.textContent = '';
      this.passwordErrorEl.textContent = '';

      let isValid = true;

      // Show an error if the user enters nothing
      if (!email) {
        this.emailErrorEl.textContent = REQUIRED_FIELD;
        isValid = false;
      }

      // Show an error if the user enters nothing
      if (!password) {
        this.passwordErrorEl.textContent = REQUIRED_FIELD_PASSWORD;
        isValid = false;
      }

      if (isValid) {
        // Call the provided submitLogin callback with email and password
        submitLogin(email, password);
      }
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
  showLoginMessage(message, type) {
    showToast(message, type);
  }

  disableSubmitButton = () => {
    this.submitButtonEl.disabled = true;
    this.submitButtonEl.classList.add('disabled');
  };

  enableSubmitButton = () => {
    this.submitButtonEl.disabled = false;
    this.submitButtonEl.classList.remove('disabled');
  };

  /**
   * Redirects the user to a specified page.
   * @param {string} page - The URL of the page to redirect to.
   */
  redirectPage = (page) => {
    window.location.replace(page);
  };
}
