import UserModel from '../models/userModel'
import UserView from '../views/userView'
import UserService from '../services/userService'

export default class UserController {
  constructor() {
    this.view = new UserView()
    this.model = new UserModel()
    this.service = new UserService()

    this.view.bindFormLogin(this.handleFormLogin);
  }

  handleFormLogin = async (email, password) => {
    try {
      const userData = await this.service.loginUser(email, password);

      if (userData) {
        this.view.redirectPage("dashboard.html");
      } else {
        alert('Login Unsuccessful')
      }
    } catch (error) {
      console.error(error);
    }
  }
}

