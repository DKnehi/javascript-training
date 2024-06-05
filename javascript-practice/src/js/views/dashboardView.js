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
    //Dashboard Element
    this.popupOverlayEl = document.querySelector('.popup-overlay-add-user');
    this.inputEl = document.querySelectorAll('#addUserForm input');
    this.cancelFormEl = document.querySelector('#addUserForm .popup-button-cancel');
  }

  /**
   * After clicking on the arrow in the header, Logout will drop down.
   */
  toggleDropDownMenu = () => {
    const selectWrapperEl = document.querySelector('.select-account-setting-list');
    const arrowEl = document.querySelector('.header-dashboard-profile-notification-box .arrow');
    const isArrowUp = true;

    arrowEl.addEventListener('click', () => {
      selectWrapperEl.classList.toggle('select-account-setting-active');
      selectWrapperEl.classList.toggle('block');
      arrowEl.classList.toggle('arrow-up');
      isArrowUp = !isArrowUp;
    });
  };

  /**
   * After successful login, the name and role will be displayed on the page header.
   * @param {object} userInfo - Object containing user information.
   */
  showUserInfo = (userInfo) => {
    const fullNameEl = document.querySelector('.header-dashboard-profile-name');
    const headerNameEl = document.querySelector('.header-dashboard-name');
    const roleEl = fullNameEl.closest('.header-dashboard-profile-name-box').parentElement.querySelector('p');
    const firstName = localStorage.getItem(LOCAL_STORAGE.FIRST_NAME);
    const lastName = localStorage.getItem(LOCAL_STORAGE.LAST_NAME);
    const role = localStorage.getItem(LOCAL_STORAGE.ROLE);

    if (firstName && lastName && role) {
      headerNameEl.textContent = `Hello, ${firstName}`;
      fullNameEl.textContent = `${firstName} ${lastName}`;
      roleEl.textContent = role;
    }
  };

  /**
   * After clicking on the add user button, a popup containing the add user form appears.
   */
  bindPopupUser = () => {
    const openPopupEl = document.querySelector('.user-dashboard .add-user-button');
    const closePopupEl = document.querySelector('.popup-overlay-add-user .close-popup-box');

    openPopupEl.addEventListener('click', () => {
      this.popupOverlayEl.classList.add('popup-overlay-active', 'block');
    });

    closePopupEl.addEventListener('click', () => {
      this.popupOverlayEl.classList.remove('popup-overlay-active', 'block');
    });
  };

   /**
   * After clicking on the x button, turn off the popup containing the add user form.
   */
  closePopupUser = () => {
    this.popupOverlayEl.classList.remove('popup-overlay-active', 'block');
  };

   /**
   * The function binds the submit event of the add user form to the provided callback. It validates the form fields and displays error messages if validation fails.
   * @param {function} submitAddUser - Function to handle the form submission event.
   */

  bindFormAddUser = (submitAddUser) => {
    // Add User Form Element
    const addUserFormEl = document.getElementById('addUserForm');
    const addFirstNameEl = addUserFormEl.querySelector('input[name="firstName"]');
    const addLastNameEl = addUserFormEl.querySelector('input[name="lastName"]');
    const addEmailIdEl = addUserFormEl.querySelector('input[name="email"]');
    const addMobileNoEl = addUserFormEl.querySelector('input[name="mobileNo"]');
    const addRoleEl = addUserFormEl.querySelector('select[name="addRole"]');
    const addUserNameEl = addUserFormEl.querySelector('input[name="userName"]');
    const addPasswordEl = addUserFormEl.querySelector('input[name="password"]');
    const addConfirmPasswordEl = addUserFormEl.querySelector('input[name="confirmPassword"]');

    // Error Add User Form Element
    const addUserErrorEls = {
      addFirstNameEl: addFirstNameEl.nextElementSibling,
      addLastNameEl: addLastNameEl.nextElementSibling,
      addEmailIdEl: addEmailIdEl.nextElementSibling,
      addMobileNoEl: addMobileNoEl.nextElementSibling,
      addUserNameEl: addUserNameEl.nextElementSibling,
      addPasswordEl: addPasswordEl.nextElementSibling,
      addConfirmPasswordEl: addConfirmPasswordEl.nextElementSibling,
      addFirstNameEl: addFirstNameEl.nextElementSibling,
      addRoleEl: addRoleEl.closest('.input').nextElementSibling,
    };

    addUserFormEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const firstName = addFirstNameEl.value;
      const lastName = addLastNameEl.value;
      const email = addEmailIdEl.value;
      const mobile = addMobileNoEl.value;
      const role = addRoleEl.value;
      const userName = addUserNameEl.value;
      const password = addPasswordEl.value;
      const confirmPassword = addConfirmPasswordEl.value;

      Object.values(addUserErrorEls).forEach((el) => {
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
        if (!email && addUserErrorEls.addEmailIdEl) {
          addUserErrorEls.addEmailIdEl.textContent = `${REQUIRED_FIELD}`;
        }

        //Show an error if the user enters nothing
        if (!role && addUserErrorEls.addRoleEl) {
          addUserErrorEls.addRoleEl.textContent = `${REQUIRED_FIELD}`;
        }

        //Show an error if the user enters nothing
        if (!confirmPassword && addUserErrorEls.addConfirmPasswordEl) {
          addUserErrorEls.addConfirmPasswordEl.textContent = `${REQUIRED_FIELD}`;
        }

        //Displays an error if the user enters digits
        if (!validateInputText(firstName) && addUserErrorEls.addFirstNameEl) {
          addUserErrorEls.addFirstNameEl.textContent = `${REQUIRED_TEXT}`;
        }

        //Displays an error if the user enters digits
        if (!validateInputText(lastName) && addUserErrorEls.addLastNameEl) {
          addUserErrorEls.addLastNameEl.textContent = `${REQUIRED_TEXT}`;
        }

        //Displays an error if the user enters digits
        if (!validateInputText(userName) && addUserErrorEls.addUserNameEl) {
          addUserErrorEls.addUserNameEl.textContent = `${REQUIRED_TEXT}`;
        }

        //Displays an error if the user enters the wrong phonenumber format
        if (!validatePhoneNumber(mobile) && addUserErrorEls.addMobileNoEl) {
          addUserErrorEls.addMobileNoEl.textContent = `${INVALID_PHONE_NUMBER}`;
        }

        //Displays an error if the user enters the wrong password format
        if (!validatePassword(password) && addUserErrorEls.addPasswordEl) {
          addUserErrorEls.addPasswordEl.textContent = `${INVALID_PASSWORD}`;
        }

        //Displays an error if the user enters a confirm password that is not the same as the password
        if (!validateConfirmPassword(password, confirmPassword) && addUserErrorEls.addConfirmPasswordEl) {
          addUserErrorEls.addConfirmPasswordEl.textContent = `${INVALID_CONFIRM_PASSWORD}`;
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

    // Clear error messages on input
    this.clearErrorOnInput(addFirstNameEl, addUserErrorEls.addFirstNameEl);
    this.clearErrorOnInput(addLastNameEl, addUserErrorEls.addLastNameEl);
    this.clearErrorOnInput(addEmailIdEl, addUserErrorEls.addEmailIdEl);
    this.clearErrorOnInput(addMobileNoEl, addUserErrorEls.addMobileNoEl);
    this.clearErrorOnInput(addRoleEl, addUserErrorEls.addRoleEl);
    this.clearErrorOnInput(addUserNameEl, addUserErrorEls.addUserNameEl);
    this.clearErrorOnInput(addPasswordEl, addUserErrorEls.addPasswordEl);
    this.clearErrorOnInput(addConfirmPasswordEl, addUserErrorEls.addConfirmPasswordEl);
  };

  /**
   * The function handles if the user re-enters from an input that is reporting an error, then clears that error.
   * @param {HTMLElement} inputEl - The input element being validated.
   * @param {HTMLElement} errorEl - The element displaying the error message.
   */
  clearErrorOnInput = (inputEl, errorEl) => {
    inputEl.addEventListener('input', () => {
      if (errorEl) errorEl.textContent = '';
    });
  };

   /**
   * Clears entered data on input cells.
   */
  clearInputs = () => {
    this.cancelFormEl.addEventListener('click', this.clearInputs);
    this.inputEl.forEach((input) => {
      input.value = '';
    });
  };

  /**
   * Message notification function.
   * @param {string} message - The message to be displayed.
   */
  addUserMessage(message) {
    showToast(message);
  };

  /**
   * The function generates and displays the table of users.
   * @param {Array} data - Array of user data.
   */
  renderTableListUsers = (data) => {
    const tableContainer = document.querySelector('.list-user')
    const tableHTML = generateTableHTML(data);
    
    if (tableContainer) {
      tableContainer.innerHTML = tableHTML;
    } else {
      console.error('Table container element not found.');
    }
  };

  /**
   * The function assigns a callback function to the click event on the logout element.
   * @param {function} callback - Function to handle the logout event.
   */
  bindLogout(callback) {
    const logoutEl = document.getElementById('logout');
    
    logoutEl.addEventListener('click', callback);
  };

  redirectPage = (page) => {
    window.location.replace(page);
  };
}
