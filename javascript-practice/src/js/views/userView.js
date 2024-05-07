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
    this.arrowEl = document.getElementById('arrow');
    this.logoutEl = document.getElementById('logout');

    this.isArrowUp = true;
    this.bindLogoutDropDow();
  };

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
    });

    this.passwordFormEl.addEventListener('input', () => {
      this.passwordErrorEl.textContent = '';
    });
  };

  //After clicking on the arrow in the header, Logout will drop down
  bindLogoutDropDow = () => {
    this.arrowEl.addEventListener('click', () => {
      if (this.isArrowUp) {
        this.logoutEl.style.display = 'block';
        this.arrowEl.classList.add('arrow-up');
      } else {
        this.logoutEl.style.display = 'none';
        this.arrowEl.classList.remove('arrow-up');
      }
      this.isArrowUp = !this.isArrowUp;
    })
  };

  redirectPage = (page) => {
    window.location.replace(page);
  };
}
