import UserModel from '../models/userModel';
import UserService from '../services/userService';
import DashboardView from '../views/dashboardView';
import NOTIFY_MESSAGE from '../constants/message';
import { URLS } from '../constants/urls';
import { LOCAL_STORAGE } from '../constants/localStorage';
import { ROLES } from '../constants/role';

const {
  ADD_USER_SUCCESS,
  ADD_USER_FAILED,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
  NOT_DELETE,
  EMAIL_EXISTS,
} = NOTIFY_MESSAGE;

export default class DashboardController {
  constructor() {
    this.view = new DashboardView();
    this.model = new UserModel();
    this.service = new UserService();

    this.checkAccess();
    this.view.bindFormUser(this.addUser.bind(this), this.updateUser.bind(this));
    this.view.bindLogout(this.handleLogout.bind(this));
    this.view.toggleDropDownMenu();
    this.view.showUserInfo();
    this.view.bindPopupUser();
    this.renderTableListUsers();
  }

  /**
   * Check user access by checking the roles saved in localStorage.
   */
  checkAccess() {
    const role = localStorage.getItem(LOCAL_STORAGE.ROLE);
    if (!role || role.toLowerCase() !== ROLES.SUPER_ADMIN) {
      window.location.href = URLS.INDEX;
    }
  }

  /**
   * The function is used to add a new user to the system.
   */
  addUser = async (
    firstName,
    lastName,
    email,
    mobile,
    role,
    userName,
    password
  ) => {
    this.view.disableSubmitButton();
    const emailExists = await this.service.isEmailExists(email);

    if (emailExists) {
      this.view.dashboardMessage(EMAIL_EXISTS, 'error');

      return;
    }
    const newUser = new UserModel(
      firstName,
      lastName,
      email,
      mobile,
      role,
      userName,
      password
    );

    const addedUser = await this.service.addUser(newUser);

    if (addedUser) {
      this.view.closePopupUser();
      this.view.dashboardMessage(ADD_USER_SUCCESS);
      this.renderTableListUsers();
    } else {
      this.view.dashboardMessage(ADD_USER_FAILED, 'error');
    }
    this.view.enableSubmitButton();

    return addedUser;
  };

  /**
   * The function is used to display a list of users in a table on the user interface.
   */
  renderTableListUsers = async () => {
    const data = await this.service.getAllUser();

    this.view.renderTableListUsers(data);
    this.view.bindEditUser();
    this.view.bindDeleteUser(this.deleteUser.bind(this));
  };

  /**
   * This function updates an existing user in the system by sending a PUT request to the API with the user's updated data.
   * @param {Object} userData - The updated user data including userId and other fields.
   * @returns {Promise<Object>} - A promise that resolves to the updated user object.
   */
  updateUser = async (userData) => {
    this.view.disableSubmitButton();
    const emailExists = await this.service.isEmailExists(
      userData.email,
      userData.id
    );

    if (emailExists) {
      this.view.dashboardMessage(EMAIL_EXISTS, 'error');

      return;
    }
    const updatedUser = await this.service.updateUser(userData.id, userData);

    if (updatedUser) {
      this.view.closePopupUser();
      this.view.dashboardMessage(UPDATE_USER_SUCCESS);
      this.renderTableListUsers();
    } else {
      this.view.dashboardMessage(UPDATE_USER_FAILED, 'error');
    }
    this.view.enableSubmitButton();

    return updatedUser;
  };

  /**
   * Delete a user by their ID.
   * @param {string} id - The ID of the user to delete.
   */
  deleteUser = async (id) => {
    try {
      const userData = await this.service.getUserById(id);

      if (userData.role === 'Super Admin') {
        this.view.dashboardMessage(NOT_DELETE, 'error');
        return;
      }

      await this.service.deleteUser(id);
      this.view.dashboardMessage(DELETE_USER_SUCCESS);
      this.renderTableListUsers();
      this.view.enableSubmitButton();
    } catch (error) {
      this.view.dashboardMessage(DELETE_USER_FAILED, 'error');
      console.error('Failed to delete user:', error);
    }
  };

  /**
   * Handle user logout.
   * Clear localStorage and redirect to the login page.
   */
  handleLogout() {
    localStorage.clear();
    window.location.href = URLS.INDEX;
  };
}
