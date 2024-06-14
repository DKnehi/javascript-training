import UserModel from '../models/userModel';
import UserView from '../views/userView';
import UserService from '../services/userService';
import NOTIFY_MESSAGE from '../constants/message';
import { URLS } from '../constants/urls';
import { LOCAL_STORAGE } from '../constants/localStorage';
import { ROLES } from '../constants/role';

const { LOGIN_FAILED } = NOTIFY_MESSAGE;

export default class UserController {
  constructor() {
    this.view = new UserView();
    this.model = new UserModel();
    this.service = new UserService();

    this.view.bindFormLogin(this.handleFormLogin.bind(this));
  }

  /**
   * The handleFormLogin function handles user login after they have entered their email and password into the login form.
   * @param {string} email - The email entered by the user for login.
   * @param {string} password - The password entered by the user for login.
   */
  handleFormLogin = async (email, password) => {
    this.view.disableSubmitButton();
    const userData = await this.service.loginUser(email, password);

    if (userData) {
      localStorage.setItem(LOCAL_STORAGE.FIRST_NAME, userData.firstName);
      localStorage.setItem(LOCAL_STORAGE.LAST_NAME, userData.lastName);
      localStorage.setItem(LOCAL_STORAGE.ROLE, userData.role);
      if (userData.role.toLowerCase() === ROLES.SUPER_ADMIN) {
        this.view.redirectPage(URLS.DASHBOARD);
      } else {
        this.view.redirectPage(URLS.USER);
      }
    } else {
      this.view.showLoginMessage(LOGIN_FAILED, 'error');
    }
    this.view.enableSubmitButton();
  };
}
