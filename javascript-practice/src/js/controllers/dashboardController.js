import UserModel from '../models/userModel';
import UserService from '../services/userService';
import DashboardView from '../views/dashboardView';
import NOTIFY_MESSAGE from '../constants/message';

const { ADD_USER_SUCCES, ADD_USER_FAILED } = NOTIFY_MESSAGE;

export default class DashboardController {
  constructor(view, model, service) {
    this.view = new DashboardView();
    this.model = new UserModel();
    this.service = new UserService();

    this.view.bindFormAddUser(this.addUser.bind(this));
    this.view.toggleDropDownMenu();
    this.view.showUserInfo();
    this.view.bindPopupUser();
    this.view.clearInputs();
    this.view.clearErrorOnInput();
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
}
