import UserModel from '../models/userModel';
import UserService from '../services/userService';
import DashboardView from '../views/dashboardView';
import NOTIFY_MESSAGE from '../constants/message';
import { URLS } from '../constants/urls';
import { LOCAL_STORAGE } from '../constants/localStorage';
import { ROLES } from '../constants/role';

const { ADD_USER_SUCCESS, ADD_USER_FAILED, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED } = NOTIFY_MESSAGE;

export default class DashboardController {
  constructor(view, model, service) {
    this.view = new DashboardView();
    this.model = new UserModel();
    this.service = new UserService();

    this.checkAccess();
    this.view.bindFormUser(this.addUser.bind(this), this.updateUser.bind(this));
    this.view.bindLogout(this.handleLogout.bind(this));
    this.view.toggleDropDownMenu();
    this.view.showUserInfo();
    this.view.bindPopupUser();
    this.view.clearInputs();
    this.renderTableListUsers();
  }

  /**
   * Check user access by checking the roles saved in localStorage.
   */
  checkAccess() {
    const role = localStorage.getItem(LOCAL_STORAGE.ROLE);
    //Redirect to the index page if the role is not SUPER_ADMIN
    if (!role || role.toLowerCase() !== ROLES.SUPER_ADMIN) {
      window.location.href = URLS.INDEX;
    }
  };

  /**
   * The function is used to add a new user to the system.
   */
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

      this.view.addUserMessage(`${ADD_USER_SUCCESS}`);
      setTimeout(() => {
        this.view.closePopupUser();
        this.renderTableListUsers();
      }, 1500);
      return addedUser;
    } catch (error) {
      this.view.addUserMessage(`${ADD_USER_FAILED}`, 'error');
      throw new Error('Failed to add user.');
    }
  };

  /**
   * The function is used to display a list of users in a table on the user interface.
   */
  renderTableListUsers = async () => {
    try {
      const data = await this.service.getAllUser();

      this.view.renderTableListUsers(data);
       this.view.bindEditUser();
    } catch (error) {
      console.error('Error rendering table:', error);
    }
  };

  /**
 * This function updates an existing user in the system by sending a PUT request to the API with the user's updated data.
 * @param {Object} userData - The updated user data including userId and other fields.
 * @returns {Promise<Object>} - A promise that resolves to the updated user object.
 */
  updateUser = async (userData) => {
    try {
      const updatedUser = await this.service.updateUser(userData.userId, userData);

      this.view.addUserMessage(`${UPDATE_USER_SUCCESS}`);
      setTimeout(() => {
        this.view.closePopupUser();
        this.renderTableListUsers();
      }, 1500);
      return updatedUser;
    } catch (error) {
      this.view.addUserMessage(`${UPDATE_USER_FAILED}`, 'error');
      throw new Error('Failed to update user.');
    }
  };

   /**
   * Handle user logout.
   * Clear localStorage and redirect to the login page.
   */
  handleLogout() {
    localStorage.clear(); 
    window.location.href = URLS.LOGIN; 
  };
}
