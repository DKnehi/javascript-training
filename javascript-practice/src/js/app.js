import UserController from './controllers/userController';
import UserModel from './models/userModel';
import UserView from './views/userView';
// import DashboardController from './controllers/dashboardController'
import DashboardView from './views/dashboardView';

export default class App {
  async start() {
    const path = window.location.pathname;
    const model = new UserModel();

    if (path.includes('login')) {
      const view = new UserView();
      const controller = new UserController(model, view);
      view.bindFormLogin(controller.handleFormLogin);
    } else if (path.includes('dashboard')) {
      const view = new DashboardView();
      // const controller = new DashboardController(model, view);
      view.showUserInfo();
      view.toggleDropDownMenu();
      view.bindPopupUser();
    }
  }
}
