import UserModel from '../models/userModel';
import UserView from '../views/userView';
import UserService from '../services/userService';
import NOTIFY_MESSAGE from '../constants/message';
import { URLS } from '../constants/urls';
import { LOCAL_STORAGE } from '../constants/localStorage';

const { LOGIN_FAILED } = NOTIFY_MESSAGE;

export default class UserController {
  constructor(view, model, service) {
    this.view = new UserView();
    this.model = new UserModel();
    this.service = new UserService();

    this.view.bindFormLogin(this.handleFormLogin.bind(this));
  }

  handleFormLogin = async (email, password) => {
    try {
      const userData = await this.service.loginUser(email, password);

      if (userData) {
        localStorage.setItem(LOCAL_STORAGE.FIRST_NAME, userData.firstName);
        localStorage.setItem(LOCAL_STORAGE.LAST_NAME, userData.lastName);
        localStorage.setItem(LOCAL_STORAGE.ROLE, userData.role);
        if (userData.role.toLowerCase() === 'supper admin') {
          this.view.redirectPage(URLS.DASHBOARD);
        } else {
          this.view.redirectPage(URLS.INDEX);
        }
      } else {
        this.view.showLoginFailedMessage(`${LOGIN_FAILED}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
}
