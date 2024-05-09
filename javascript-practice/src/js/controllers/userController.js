import showToast from '../views/toast';
import UserModel from '../models/userModel';
import UserView from '../views/userView';
import UserService from '../services/userService';
import NOTIFY_MESSAGE from '../constants/message';

const { LOGIN_FAILED } = NOTIFY_MESSAGE;

export default class UserController {
  constructor() {
    this.view = new UserView();
    this.model = new UserModel();
    this.service = new UserService();

    this.view.bindFormLogin(this.handleFormLogin);
  };

  handleFormLogin = async (email, password) => {
    try {
      const userData = await this.service.loginUser(email, password);

      if (userData) {
        this.view.redirectPage('dashboard.html');
        localStorage.setItem('firstName', userData.firstName);
        localStorage.setItem('lastName', userData.lastName);
        localStorage.setItem('role', userData.role);
      } else {
        showToast(`${LOGIN_FAILED}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
};
