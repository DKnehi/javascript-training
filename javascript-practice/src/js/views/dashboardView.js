import { LOCAL_STORAGE } from '../constants/localStorage';
import {
  validateInputText,
  validatePassword,
  validateConfirmPassword,
  validatePhoneNumber,
} from '../helpers/validation';
import showToast from '../views/toast';
import { ERROR_MESSAGE } from '../constants/message';
import { generateTableHTML } from '../templates/userTemplate';

export const {
  REQUIRED_FIELD_PASSWORD,
  REQUIRED_FIELD,
  INVALID_PASSWORD,
  REQUIRED_TEXT,
  INVALID_CONFIRM_PASSWORD,
  INVALID_PHONE_NUMBER,
} = ERROR_MESSAGE;

export default class DashboardView {
  constructor() {
    // Dashboard header elements
    this.arrowEl = document.getElementById('arrow');
    this.fullNameEl = document.getElementById('fullName');
    this.headerNameEl = document.getElementById('headerName');
    this.openPopupEl = document.getElementById('openPopup');
    this.closePopupEl = document.getElementById('closePopup');
    this.popupContainerEl = document.getElementById('popupContainer');
    this.roleEl = document.getElementById('role');
    this.logoutEl = document.getElementById('logout')

    // Add User Form Element
    this.addUserFormEl = document.getElementById('addUserForm');
    this.addFirstNameEl = document.getElementById('addFirstName');
    this.addLastNameEl = document.getElementById('addLastName');
    this.addEmailIdEl = document.getElementById('addEmailId');
    this.addMobileNoEl = document.getElementById('addMobileNo');
    this.addRoleEl = document.getElementById('addRole');
    this.addUserNameEl = document.getElementById('addUserName');
    this.addPasswordEl = document.getElementById('addPassword');
    this.addConfirmPasswordEl = document.getElementById('addConfirmPassword');
    this.cancelFormEl = document.getElementById('cancelForm');
    this.inputEl = this.addUserFormEl.querySelectorAll('input');

    // Error Add User Form Element
    this.addUserErrorEls = {
      addFirstNameEl: document.querySelector('.add-first-name'),
      addLastNameEl: document.querySelector('.add-last-name'),
      addEmailIdEl: document.querySelector('.add-email-id'),
      addMobileNoEl: document.querySelector('.add-mobile-no'),
      addRoleEl: document.querySelector('.add-role'),
      addUserNameEl: document.querySelector('.add-user-name'),
      addPasswordEl: document.querySelector('.add-password'),
      addConfirmPasswordEl: document.querySelector('.add-confirm-password'),
    };

    // Other Dashboard Element
    this.selectWrapperEl = document.querySelector(
      '.select-account-setting-list'
    );
    this.popupOverlayEl = document.querySelector('.popup-overlay');
    this.tableContainer = document.querySelector('.list-user')
    this.isArrowUp = true;
    this.bindLogout();
  }

  //After clicking on the arrow in the header, Logout will drop down
  toggleDropDownMenu = () => {
    this.arrowEl.addEventListener('click', () => {
      this.selectWrapperEl.classList.toggle('select-account-setting-active');
      this.selectWrapperEl.classList.toggle('block');
      this.arrowEl.classList.toggle('arrow-up');
      this.isArrowUp = !this.isArrowUp;
    });
  };

  showUserInfo = (userInfo) => {
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
      this.popupOverlayEl.classList.add('popup-overlay-active', 'block');
    });

    this.closePopupEl.addEventListener('click', () => {
      this.popupOverlayEl.classList.remove('popup-overlay-active', 'block');
    });
  };

  bindFormAddUser = (submitAddUser) => {
    this.addUserFormEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const firstName = this.addFirstNameEl.value;
      const lastName = this.addLastNameEl.value;
      const email = this.addEmailIdEl.value;
      const mobile = this.addMobileNoEl.value;
      const role = this.addRoleEl.value;
      const userName = this.addUserNameEl.value;
      const password = this.addPasswordEl.value;
      const confirmPassword = this.addConfirmPasswordEl.value;

      Object.values(this.addUserErrorEls).forEach((el) => {
        el.textContent = '';
      });

      let isValid = true;

      if (
        !email ||
        !role ||
        !validateInputText(firstName, lastName, userName ) ||
        !validatePhoneNumber(mobile) ||
        !validatePassword(password) ||
        !validateConfirmPassword(password, confirmPassword)
      ) {
        //Show an error if the user enters nothing
        if (!email && this.addUserErrorEls.addEmailIdEl) {
          this.addUserErrorEls.addEmailIdEl.textContent = `${REQUIRED_FIELD}`;
        }

        //Show an error if the user enters nothing
        if (!role && this.addUserErrorEls.addRoleEl) {
          this.addUserErrorEls.addRoleEl.textContent = `${REQUIRED_FIELD}`;
        }

        //Show an error if the user enters nothing
        if (!confirmPassword && this.addUserErrorEls.addConfirmPasswordEl) {
          this.addUserErrorEls.addConfirmPasswordEl.textContent = `${REQUIRED_FIELD}`;
        }

        //Displays an error if the user enters digits
        if (!validateInputText(firstName) && this.addUserErrorEls.addFirstNameEl) {
          this.addUserErrorEls.addFirstNameEl.textContent = `${REQUIRED_TEXT}`;
        }

        //Displays an error if the user enters digits
        if (!validateInputText(lastName) && this.addUserErrorEls.addLastNameEl) {
          this.addUserErrorEls.addLastNameEl.textContent = `${REQUIRED_TEXT}`;
        }

        //Displays an error if the user enters digits
        if (!validateInputText(userName) && this.addUserErrorEls.addUserNameEl) {
          this.addUserErrorEls.addUserNameEl.textContent = `${REQUIRED_TEXT}`;
        }

        //Displays an error if the user enters the wrong phonenumber format
        if (!validatePhoneNumber(mobile) && this.addUserErrorEls.addMobileNoEl) {
          this.addUserErrorEls.addMobileNoEl.textContent = `${INVALID_PHONE_NUMBER}`;
        }

        //Displays an error if the user enters the wrong password format
        if (!validatePassword(password) && this.addUserErrorEls.addPasswordEl) {
          this.addUserErrorEls.addPasswordEl.textContent = `${INVALID_PASSWORD}`;
        }

        //Displays an error if the user enters a confirm password that is not the same as the password
        if (!validateConfirmPassword(password, confirmPassword) && this.addUserErrorEls.addConfirmPasswordEl) {
          this.addUserErrorEls.addConfirmPasswordEl.textContent = `${INVALID_CONFIRM_PASSWORD}`;
        }
        isValid = false;
      }

      if (isValid) {
        submitAddUser(
          firstName,
          lastName,
          email,
          mobile,
          role,
          userName,
          password,
          confirmPassword
        );
      }
    });

    this.clearErrorOnInput(this.addFirstNameEl, this.addUserErrorEls.addFirstNameEl);
    this.clearErrorOnInput(this.addLastNameEl, this.addUserErrorEls.addLastNameEl);
    this.clearErrorOnInput(this.addEmailIdEl, this.addUserErrorEls.addEmailIdEl);
    this.clearErrorOnInput(this.addMobileNoEl, this.addUserErrorEls.addMobileNoEl);
    this.clearErrorOnInput(this.addRoleEl, this.addUserErrorEls.addRoleEl);
    this.clearErrorOnInput(this.addUserNameEl, this.addUserErrorEls.addUserNameEl);
    this.clearErrorOnInput(this.addPasswordEl, this.addUserErrorEls.addPasswordEl);
    this.clearErrorOnInput(this.addConfirmPasswordEl, this.addUserErrorEls.addConfirmPasswordEl);
  };

  clearErrorOnInput = (inputEl, errorEl) => {
    inputEl.addEventListener('input', () => {
      if (errorEl) errorEl.textContent = '';
    });
  };

  //Clears entered data on input cells
  clearInputs = () => {
    this.cancelFormEl.addEventListener('click', this.clearInputs);
    this.inputEl.forEach((input) => {
      input.value = '';
    });
  };

  addUserMessage(message) {
    showToast(message);
  };

  renderTableListUsers = (data) => {
    const tableHTML = generateTableHTML(data);
    if (this.tableContainer) {
      this.tableContainer.innerHTML = tableHTML;
    } else {
      console.error('Table container element not found.');
    }
  };

  bindLogout(callback) {
    this.logoutEl.addEventListener('click', callback);
  };

  redirectPage = (page) => {
    window.location.replace(page);
  };
}
