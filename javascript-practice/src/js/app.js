import UserController from './controllers/userController';
import UserView from './views/userView';
import UserModel from './models/userModel';
import DashboardController from './controllers/dashboardController';
import DashboardView from './views/dashboardView';
import { PATHS } from './constants/urls';
import { LOCAL_STORAGE } from './constants/localStorage';

export default class App {
  async start() {
    const path = window.location.pathname;
    const role = localStorage.getItem(LOCAL_STORAGE.ROLE);

    if (path.includes(PATHS.DASHBOARD)) {
      if (!role || role.toLowerCase() !== 'super admin') {
        window.location.href = PATHS.LOGIN;
        return;
      } else {
        const model = new UserModel();
        const view = new DashboardView();
        new DashboardController(view, model);
        return;
      }
    }
    const model = new UserModel();
    const view = new UserView();
    new UserController(view, model);
  }
}
