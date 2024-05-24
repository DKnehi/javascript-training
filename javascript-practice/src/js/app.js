import UserController from './controllers/userController';
import UserModel from './models/userModel';
import UserView from './views/userView';
import DashboardController from './controllers/dashboardController'
import DashboardView from './views/dashboardView';
import { PATHS } from './constants/urls';

export default class App {
  async start() {
    const path = window.location.pathname;
    const model = new UserModel();

    if (path.includes(PATHS.LOGIN)) {
      const view = new UserView();
      const controller = new UserController(model, view);
      view.bindFormLogin(controller.handleFormLogin);
    } else if (path.includes(PATHS.DASHBOARD)) {
      const view = new DashboardView();
      const controller = new DashboardController(model, view);
      view.bindFormAddUser(controller.addUser);
      view.showUserInfo();
      view.toggleDropDownMenu();
      view.bindPopupUser();
    }
  }
}
