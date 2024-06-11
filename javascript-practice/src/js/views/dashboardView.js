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
    // Add User Form Element
    this.addUserFormEl = document.getElementById('addUserForm');
    this.addUserIdEl = this.addUserFormEl.querySelector('input[name="userId"]');
    this.addFirstNameEl = this.addUserFormEl.querySelector('input[name="firstName"]');
    this.addLastNameEl = this.addUserFormEl.querySelector('input[name="lastName"]');
    this.addEmailIdEl = this.addUserFormEl.querySelector('input[name="email"]');
    this.addMobileNoEl = this.addUserFormEl.querySelector('input[name="mobileNo"]');
    this.addRoleEl = this.addUserFormEl.querySelector('select[name="addRole"]');
    this.addUserNameEl = this.addUserFormEl.querySelector('input[name="userName"]');
    this.addPasswordEl = this.addUserFormEl.querySelector('input[name="password"]');
    this.addConfirmPasswordEl = this.addUserFormEl.querySelector('input[name="confirmPassword"]');
    this.cancelFormEl = this.addUserFormEl.querySelector('.popup-button-cancel');
    this.inputEl = this.addUserFormEl.querySelectorAll('input');

    // Error Add User Form Element
    this.addUserErrorEls = {
      addFirstNameEl: this.addFirstNameEl.nextElementSibling,
      addLastNameEl: this.addLastNameEl.nextElementSibling,
      addEmailIdEl: this.addEmailIdEl.nextElementSibling,
      addMobileNoEl: this.addMobileNoEl.nextElementSibling,
      addUserNameEl: this.addUserNameEl.nextElementSibling,
      addPasswordEl: this.addPasswordEl.nextElementSibling,
      addConfirmPasswordEl: this.addConfirmPasswordEl.nextElementSibling,
      addFirstNameEl: this.addFirstNameEl.nextElementSibling,
      addRoleEl: this.addRoleEl.closest('.input').nextElementSibling,
    };

    // Other Dashboard Element
    this.popupOverlayEl = document.querySelector('.popup-overlay-add-user');
    this.submitButtonEl = this.popupOverlayEl.querySelector('.primary-button');
    this.popupHeadingEl = this.popupOverlayEl.querySelector('.popup-heading');
    this.popupOverlayDeleteEl = document.querySelector('.popup-overlay-delete-user');
    this.deleteConfirmYesEl = this.popupOverlayDeleteEl.querySelector('.primary-button');
    this.deleteConfirmNoEl = this.popupOverlayDeleteEl.querySelector('.secondary-button');
  }

  /**
   * Binds the delete button click event to the delete confirmation popup.
   * @param {Function} deleteUser - The function to call when a user is confirmed to be deleted.
   */
  bindDeleteUser = (deleteUser) => {
    document.querySelectorAll('.delete-user').forEach((deleteButton) => {
      deleteButton.addEventListener('click', (event) => {
        const id = event.currentTarget.getAttribute('data-id');

        this.bindPopUpDelete(id, deleteUser);
      });
    });
  };

  /**
   * Shows the delete confirmation popup.
   * @param {string} userId - The ID of the user to delete.
   * @param {Function} deleteUser - The function to call when a user is confirmed to be deleted.
   */
  bindPopUpDelete = (id, deleteUser) => {
    this.popupOverlayDeleteEl.classList.add('popup-overlay-active', 'block');
    this.deleteConfirmYesEl.onclick = () => {
      deleteUser(id);
      this.closePopUpDelete();
    };
    this.deleteConfirmNoEl.onclick = this.closePopUpDelete;
  };

  /**
   * Closes the delete confirmation popup.
   */
  closePopUpDelete = () => {
    this.popupOverlayDeleteEl.classList.remove('popup-overlay-active', 'block');
  };

  /**
   * After clicking on the arrow in the header, Logout will drop down.
   */
  toggleDropDownMenu = () => {
    const selectWrapperEl = document.querySelector('.select-account-setting-list');
    const arrowEl = document.querySelector('.header-dashboard-profile-notification-box .arrow');

    arrowEl.addEventListener('click', () => {
      selectWrapperEl.classList.toggle('select-account-setting-active');
      selectWrapperEl.classList.toggle('block');
      arrowEl.classList.toggle('arrow-up');
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
      this.clearAddUserForm();
      this.popupOverlayEl.classList.add('popup-overlay-active', 'block');
      this.popupHeadingEl.textContent = 'Add User';
      this.submitButtonEl.textContent = 'Add User';
    });

    closePopupEl.addEventListener('click', () => {
      this.popupOverlayEl.classList.remove('popup-overlay-active', 'block');
    });
    this.cancelFormEl.addEventListener('click', () => {
      this.popupOverlayEl.classList.remove('popup-overlay-active', 'block');
    });
  };

  clearAddUserForm = () => {
    this.addUserIdEl.value = '';
    this.addFirstNameEl.value = '';
    this.addLastNameEl.value = '';
    this.addEmailIdEl.value = '';
    this.addMobileNoEl.value = '';
    this.addRoleEl.value = '';
    this.addUserNameEl.value = '';
    this.addPasswordEl.value = '';
    this.addConfirmPasswordEl.value = '';
  };
  /**
   * After clicking on the x button, turn off the popup containing the add user form.
   */
  closePopupUser = () => {
    this.popupOverlayEl.classList.remove('popup-overlay-active', 'block');
  };

  /**
   * Binds the add user form to the provided callback functions for adding and updating users.
   * Validates form fields and displays error messages if validation fails.
   * @param {function} submitAddUser - Function to handle adding a new user.
   * @param {function} submitUpdateUser - Function to handle updating an existing user.
   */
  bindFormUser = (submitAddUser, submitUpdateUser) => {
    this.addUserFormEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = this.addUserIdEl.value;
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
        !validateInputText(firstName, lastName, userName) ||
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

        //Displays an error if the user enters the wrong phone number format
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
        if (id) {
          submitUpdateUser({
            id,
            firstName,
            lastName,
            email,
            mobile,
            role,
            userName,
            password,
          });
        } else {
          submitAddUser(
            id,
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
      }
    });

    // Clear error messages on input
    this.clearErrorOnInput(this.addFirstNameEl,this.addUserErrorEls.addFirstNameEl);
    this.clearErrorOnInput(this.addLastNameEl,this.addUserErrorEls.addLastNameEl);
    this.clearErrorOnInput(this.addEmailIdEl,this.addUserErrorEls.addEmailIdEl);
    this.clearErrorOnInput(this.addMobileNoEl,this.addUserErrorEls.addMobileNoEl);
    this.clearErrorOnInput(this.addRoleEl, this.addUserErrorEls.addRoleEl);
    this.clearErrorOnInput(this.addUserNameEl,this.addUserErrorEls.addUserNameEl);
    this.clearErrorOnInput(this.addPasswordEl,this.addUserErrorEls.addPasswordEl);
    this.clearErrorOnInput(this.addConfirmPasswordEl,this.addUserErrorEls.addConfirmPasswordEl);
  };

  /**
   * Binds the edit user functionality to edit buttons.
   */
  bindEditUser = () => {
    document.querySelectorAll('.edit-user').forEach((editButton) => {
      editButton.addEventListener('click', (event) => {
        const id = event.currentTarget.getAttribute('data-id');

        this.handleEditUser(id);
      });
    });
  };

  /**
   * Handles editing a user by populating the form fields with the user's data.
   * @param {string} userId - The ID of the user to edit.
   */
  handleEditUser = (id) => {
    const userData = this.getUserDataById(id);

    this.addUserIdEl.value = userData.id;
    this.addFirstNameEl.value = userData.firstName;
    this.addLastNameEl.value = userData.lastName;
    this.addEmailIdEl.value = userData.email;
    this.addMobileNoEl.value = userData.mobile;
    this.addRoleEl.value = userData.role;
    this.addUserNameEl.value = userData.userName;
    this.addPasswordEl.value = userData.password;
    this.addConfirmPasswordEl.value = userData.password;
    this.popupHeadingEl.textContent = 'Edit User';
    this.submitButtonEl.textContent = 'Update User';
    this.popupOverlayEl.classList.add('popup-overlay-active', 'block');
  };

  /**
   * Retrieves user data by user ID from the list of users stored in the component.
   * @param {string} userId - The ID of the user to retrieve.
   * @returns {Object | undefined} - The user object with the specified ID, or undefined if not found.
   */
  getUserDataById = (id) => {
    return this.users.find((user) => user.id === id);
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
   * Message notification function.
   * @param {string} message - The message to be displayed.
   */
  dashboardMessage(message, type) {
    showToast(message, type);
  };

  /**
   * The function generates and displays the table of users.
   * @param {Array} data - Array of user data.
   */
  renderTableListUsers = (data) => {
    this.users = data;
    const tableContainer = document.querySelector('.list-user');
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
