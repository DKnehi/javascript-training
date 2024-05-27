import UserModel from '../models/userModel';
import UserService from '../services/userService';
import DashboardView from '../views/dashboardView';
import showToast from '../views/toast';
import NOTIFY_MESSAGE from '../constants/message';

const { ADD_USER_SUCCES, ADD_USER_FAILED } = NOTIFY_MESSAGE;

export default class DashboardController {
  constructor() {
    this.view = new DashboardView();
    this.model = new UserModel();
    this.service = new UserService();
  }

  addUser = async (
    userId,
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
        userId,
        firstName,
        lastName,
        email,
        phoneNumber,
        role,
        userName,
        password
      );
      const addedUser = await this.service.addUser(newUser);
      showToast(`${ADD_USER_SUCCES}`);
      return addedUser;
    } catch (error) {
      showToast(`${ADD_USER_FAILED}`, 'error');
      throw new Error('Failed to add user.');
    }
  };
}
