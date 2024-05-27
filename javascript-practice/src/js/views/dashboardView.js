import { LOCAL_STORAGE } from '../constants/localStorage';
import { validateInputLength, validateEmail, validatePassword, validatePhoneNumber } from '../helpers/validation';
import showToast from '../views/toast';
import { ERROR_MESSAGE } from '../constants/message';

export const {
  REQUIRED_FIELD_EMAIL,
  REQUIRED_FIELD_PASSWORD,
  REQUIRED_FIELD,
  INVALID_PASSWORD,
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

    this.addUserErrorEl = document.querySelectorAll('.add-user-error')
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

  bindRoleSelection = (event) => {
    const valueSelectRole = event.target.value;
  };

  bindFormAddUser = (submitAddUser) => {
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

      if (!valueAddUserId || !valueAddFirstNameId || !valueAddLastNameId || !valueAddEmailId || !valueAddMobileNoId || !valueAddUserName || !valueAddPassword || !valueAddConfirmPassword) {
        this.addUserErrorEl.textContent = `${REQUIRED_FIELD}`;
      }
      
      if (!validateInputLength(valueAddUserId) || !validateInputLength(valueAddFirstNameId) || !validateInputLength(valueAddLastNameId)) {
        // Ví dụ: this.addUserIdErrorEl.textContent = 'Tên người dùng phải có ít nhất 3 ký tự';
        this.addUserErrorEl.textContent = `${REQUIRED_FIELD}`;

        return;
      }

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
    });
  };

  addUserMessage(message) {
    showToast(message);
  }

  redirectPage = (page) => {
    window.location.replace(page);
  };
}
