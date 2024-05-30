import UserModel from '../models/userModel';
import UserService from '../services/userService';
import DashboardView from '../views/dashboardView';
import NOTIFY_MESSAGE from '../constants/message';
import { URLS } from '../constants/urls';

const { ADD_USER_SUCCES, ADD_USER_FAILED } = NOTIFY_MESSAGE;

export default class DashboardController {
  constructor(view, model, service) {
    this.view = new DashboardView();
    this.model = new UserModel();
    this.service = new UserService();

    this.view.bindFormAddUser(this.addUser.bind(this));
    this.view.bindLogout(this.handleLogout.bind(this));
    this.view.toggleDropDownMenu();
    this.view.showUserInfo();
    this.view.bindPopupUser();
    this.view.clearInputs();
    this.renderTableListUsers();
  }

  addUser = async (
    firstName,
    lastName,
    email,
    phoneNumber,
    role,
    userName,
    password
  ) => {
    try {
      const newUser = new UserModel(
        firstName,
        lastName,
        email,
        phoneNumber,
        role,
        userName,
        password
      );
      const addedUser = await this.service.addUser(newUser);
      this.view.addUserMessage(`${ADD_USER_SUCCES}`);
      return addedUser;
    } catch (error) {
      this.view.addUserMessage(`${ADD_USER_FAILED}`, 'error');
      throw new Error('Failed to add user.');
    }
  };

  renderTableListUsers = async () => {
    try {
      const data = await this.service.getAllUser();
      this.view.renderTableListUsers(data); 
    } catch (error) {
      console.error('Error rendering table:', error);
    }
  };

  handleLogout() {
    localStorage.clear(); 
    window.location.href = URLS.LOGIN; 
  };
}
