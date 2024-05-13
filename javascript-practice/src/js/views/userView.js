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
    this.emailErrorEl = document.getElementById('emailError');
    this.emailFormEl = document.getElementById('email');
    this.fullNameEl = document.getElementById('fullName');
    this.headerNameEl = document.getElementById('headerName');
    this.loginFormEl = document.getElementById('loginForm');
    this.passwordErrorEl = document.getElementById('passwordError');
    this.passwordFormEl = document.getElementById('password');
    this.openPopupEl = document.getElementById('openPopup');
    this.closePopupEl = document.getElementById('closePopup');
    this.popupContainerEl = document.getElementById('popupContainer');

    this.selectWrapperEl = document.querySelector('.select-wrapper-list');
    this.popupOverlayEl = document.querySelector('.popup-overlay');
    this.bindPopupUser();
    this.isArrowUp = true;
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
    });

    this.emailFormEl.addEventListener('input', () => {
      this.emailErrorEl.textContent = '';
    });

    this.passwordFormEl.addEventListener('input', () => {
      this.passwordErrorEl.textContent = '';
    });
  };

  //After clicking on the arrow in the header, Logout will drop down
  toggleDropDownMenu = () => {
    this.arrowEl.addEventListener('click', () => {
      if (this.isArrowUp) {
        this.selectWrapperEl.classList.add('select-wrapper-active');
        this.arrowEl.classList.add('arrow-up');
      } else {
        this.selectWrapperEl.classList.remove('select-wrapper-active');
        this.arrowEl.classList.remove('arrow-up');
      }
      this.isArrowUp = !this.isArrowUp;
    });
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

  bindPopupUser = () => {
    this.openPopupEl.addEventListener('click', () => {
      this.popupContainerEl.classList.add('popup-active');
      this.popupOverlayEl.classList.add('popup-overlay-active');
    });

    this.closePopupEl.addEventListener('click', () => {
      this.popupContainerEl.classList.remove('popup-active');
      this.popupOverlayEl.classList.remove('popup-overlay-active');
    });
  };

  redirectPage = (page) => {
    window.location.replace(page);
  };
}

renderUserInfo = () => {
  const userView = new UserView();
  userView.showUserInfo();
};

renderUserInfo();
