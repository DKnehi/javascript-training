import UserController from './controllers/userController';
import UserView from './views/userView';
import UserModel from './models/userModel';
import DashboardController from './controllers/dashboardController';
import DashboardView from './views/dashboardView';
import { PATHS } from './constants/urls';

export default class App {
  async start() {
    const path = window.location.pathname;
    const model = new UserModel();

    if (path.includes(PATHS.DASHBOARD)) {
      const view = new DashboardView();
      new DashboardController(view, model);
    }

    const view = new UserView();
    new UserController(view, model);
  }
}
