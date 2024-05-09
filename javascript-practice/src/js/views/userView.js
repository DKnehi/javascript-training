import { validatePassword } from '../helpers/validation';
import { ERROR_MESSAGE } from '../constants/message';
import { LOCAL_STORAGE } from '../constants/localStorage';

export const {
  REQUIRED_FIELD_EMAIL,
  REQUIRED_FIELD_PASSWORD,
  INVALID_EMAIL,
  INVALID_PASSWORD,
} = ERROR_MESSAGE;

export default class UserView {
  constructor() {
    this.arrowEl = document.getElementById('arrow');
    this.emailErrorEl = document.getElementById('email-error');
    this.emailFormEl = document.getElementById('email');
    this.fullNameEl = document.getElementById('fullName');
    this.headerNameEl = document.getElementById('headerName');
    this.loginFormEl = document.getElementById('login-form');
    this.logoutEl = document.getElementById('logout');
    this.passwordErrorEl = document.getElementById('password-error');
    this.passwordFormEl = document.getElementById('password');
    this.roleEl = document.getElementById('role');

    this.isArrowUp = true;
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
        this.logoutEl.classList.add('show-logout');
        this.arrowEl.classList.add('arrow-up');
      } else {
        this.logoutEl.classList.remove('show-logout');
        this.arrowEl.classList.remove('arrow-up');
      }
      this.isArrowUp = !this.isArrowUp;
    })
  };

  showUserInfo = () => {
    const firstName = localStorage.getItem(LOCAL_STORAGE.FIRST_NAME);
    const lastName = localStorage.getItem(LOCAL_STORAGE.LAST_NAME);
    const role = localStorage.getItem(LOCAL_STORAGE.ROLE);

    if (firstName && lastName && role) {
      this.headerNameEl.textContent = firstName;
      this.fullNameEl.textContent = `${firstName} ${lastName}`;
      this.roleEl.textContent = role;
    }
  };

  redirectPage = (page) => {
    window.location.replace(page);
  };

  
}
renderUserInfo = () => {
  const userView = new UserView();
userView.showUserInfo();
}
renderUserInfo()
