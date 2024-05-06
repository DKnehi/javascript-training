import UserController from './controllers/userController';
import UserModel from './models/userModel';
import UserView from './views/userView';

export default class App {
  start() {
    this.controller = new UserController(new UserModel(), new UserView());
  }
};
