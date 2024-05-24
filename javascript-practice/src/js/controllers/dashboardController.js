import UserModel from '../models/userModel';
import UserService from '../services/userService';
import DashboardView from '../views/dashboardView';

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
      return addedUser;
    } catch (error) {
      throw new Error('Failed to add user.');
    }
  };
}
