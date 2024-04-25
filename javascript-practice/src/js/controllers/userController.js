import UserModel from '../models/userModel'
import UserView from '../views/userView'

export default class UserController {
  constructor() {
    this.view = new UserView()
    this.model = new UserModel()
    
    this.view.bindFormLogin(this.handleFormLogin);
  
  }

  handleFormLogin = (email, password) => {
    //Next pages
    window.location.replace("");

  }
}

