import { LOCAL_STORAGE } from '../constants/localStorage';
import {
  validateInputText,
  validatePassword,
  validateConfirmPassword,
  validatePhoneNumber,
} from '../helpers/validation';
import showToast from '../views/toast';
import { ERROR_MESSAGE } from '../constants/message';

export const {
  REQUIRED_FIELD_EMAIL,
  REQUIRED_FIELD_PASSWORD,
  REQUIRED_FIELD,
  INVALID_PASSWORD,
  REQUIRED_TEXT,
  INVALID_CONFIRM_PASSWORD,
  INVALID_PHONE_NUMBER,
} = ERROR_MESSAGE;

export default class DashboardView {
  constructor() {
    this.arrowEl = document.getElementById('arrow');
    this.fullNameEl = document.getElementById('fullName');
    this.headerNameEl = document.getElementById('headerName');
    this.openPopupEl = document.getElementById('openPopup');
    this.closePopupEl = document.getElementById('closePopup');
    this.popupContainerEl = document.getElementById('popupContainer');
    this.roleEl = document.getElementById('role');

    this.addUserFormEl = document.getElementById('addUserForm');
    this.addUserIdEl = document.getElementById('addUserId');
    this.addFirstNameEl = document.getElementById('addFirstName');
    this.addLastNameEl = document.getElementById('addLastName');
    this.addEmailIdEl = document.getElementById('addEmailId');
    this.addMobileNoEl = document.getElementById('addMobileNo');
    this.addRoleEl = document.getElementById('addRole');
    this.addUserNameEl = document.getElementById('addUserName');
    this.addPasswordEl = document.getElementById('addPassword');
    this.addConfirmPasswordEl = document.getElementById('addConfirmPassword');

    this.addUserErrorEls = {
      addUserIdEl: document.querySelector('.add-user-id'),
      addFirstNameEl: document.querySelector('.add-first-name'),
      addLastNameEl: document.querySelector('.add-last-name'),
      addEmailIdEl: document.querySelector('.add-email-id'),
      addMobileNoEl: document.querySelector('.add-mobile-no'),
      addRoleEl: document.querySelector('.add-role'),
      addUserNameEl: document.querySelector('.add-user-name'),
      addPasswordEl: document.querySelector('.add-password'),
      addConfirmPasswordEl: document.querySelector('.add-confirm-password'),
    };
    this.selectWrapperEl = document.querySelector(
      '.select-account-setting-list'
    );
    this.popupOverlayEl = document.querySelector('.popup-overlay');
    this.isArrowUp = true;
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
    const clearError = (inputEl, errorEl) => {
      inputEl.addEventListener('input', () => {
        if (errorEl) errorEl.textContent = '';
      });
    };

    this.addUserFormEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const valueAddUserId = this.addUserIdEl.value;
      const valueAddFirstNameId = this.addFirstNameEl.value;
      const valueAddLastNameId = this.addLastNameEl.value;
      const valueAddEmailId = this.addEmailIdEl.value;
      const valueAddMobileNoId = this.addMobileNoEl.value;
      const valueAddRole = this.addRoleEl.value;
      const valueAddUserName = this.addUserNameEl.value;
      const valueAddPassword = this.addPasswordEl.value;
      const valueAddConfirmPassword = this.addConfirmPasswordEl.value;

      Object.values(this.addUserErrorEls).forEach((el) => {
        el.textContent = '';
      });
      let isValid = true;
      
      //Show error if user does not enter
      if (
        !valueAddUserId ||
        !valueAddFirstNameId ||
        !valueAddLastNameId ||
        !valueAddEmailId ||
        !valueAddMobileNoId ||
        !valueAddUserName ||
        !valueAddPassword ||
        !valueAddConfirmPassword
      ) {
        Object.entries(this.addUserErrorEls).forEach(([key, el]) => {
          if (!this[key].value) {
            el.textContent = `${REQUIRED_FIELD}`;
          }

        });
        isValid = false;
      }

      //Displays an error if the user enters numbers in this input
      if (isValid) {
        if (
          !validateInputText(valueAddUserId) ||
          !validateInputText(valueAddFirstNameId) ||
          !validateInputText(valueAddLastNameId) ||
          !validateInputText(valueAddUserName)
        ) {
          
          if (
            !validateInputText(valueAddUserId) &&
            this.addUserErrorEls.addUserIdEl
          )

            this.addUserErrorEls.addUserIdEl.textContent = `${REQUIRED_TEXT}`;
          if (
            !validateInputText(valueAddFirstNameId) &&
            this.addUserErrorEls.addFirstNameEl
          )

            this.addUserErrorEls.addFirstNameEl.textContent = `${REQUIRED_TEXT}`;
          if (
            !validateInputText(valueAddLastNameId) &&
            this.addUserErrorEls.addLastNameEl
          )

            this.addUserErrorEls.addLastNameEl.textContent = `${REQUIRED_TEXT}`;
          if (
            !validateInputText(valueAddUserName) &&
            this.addUserErrorEls.addUserNameEl
          )

            this.addUserErrorEls.addUserNameEl.textContent = `${REQUIRED_TEXT}`;
          isValid = false;
        }
      }

      //Show an error if the user does not select a role
      if (!valueAddRole) {
        this.addUserErrorEls.addRoleEl.textContent = `${REQUIRED_FIELD}`;
        isValid = false;
      }

      //Show an error if this case is not in the correct format
      if (!validatePhoneNumber(valueAddMobileNoId)) {
        this.addUserErrorEls.addMobileNoEl.textContent = `${INVALID_PHONE_NUMBER}`;
        isValid = false;
      }

      if (!validatePassword(valueAddPassword)) {
        this.addUserErrorEls.addPasswordEl.textContent = `${INVALID_PASSWORD}`;
        isValid = false;
      }

      if (!validateConfirmPassword(valueAddPassword, valueAddConfirmPassword)) {
        this.addUserErrorEls.addConfirmPasswordEl.textContent = `${INVALID_CONFIRM_PASSWORD}`;
        isValid = false;
      }

      if (isValid) {
        submitAddUser(
          valueAddUserId,
          valueAddFirstNameId,
          valueAddLastNameId,
          valueAddEmailId,
          valueAddMobileNoId,
          valueAddRole,
          valueAddUserName,
          valueAddPassword,
          valueAddConfirmPassword
        );
      }
    });

    clearError(this.addUserIdEl, this.addUserErrorEls.addUserIdEl);
    clearError(this.addFirstNameEl, this.addUserErrorEls.addFirstNameEl);
    clearError(this.addLastNameEl, this.addUserErrorEls.addLastNameEl);
    clearError(this.addEmailIdEl, this.addUserErrorEls.addEmailIdEl);
    clearError(this.addMobileNoEl, this.addUserErrorEls.addMobileNoEl);
    clearError(this.addRoleEl, this.addUserErrorEls.addRoleEl);
    clearError(this.addUserNameEl, this.addUserErrorEls.addUserNameEl);
    clearError(this.addPasswordEl, this.addUserErrorEls.addPasswordEl);
    clearError(
      this.addConfirmPasswordEl,
      this.addUserErrorEls.addConfirmPasswordEl
    );
  };

  addUserMessage(message) {
    showToast(message);
  }

  redirectPage = (page) => {
    window.location.replace(page);
  };
}
