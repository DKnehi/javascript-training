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
    // call api get 
    try {
      const userData = await this.service.checkEmailPassword(email, password);
      console.log(userData);
      if(userData) {
        this.view.redirectPage("dashboard.html");
      }
      else {
        alert('Đăng nhập ko thành công')
      }

    } catch (error) {
     console.error(error);
    }
  }
}

