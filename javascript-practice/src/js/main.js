import UserView from "./views/userView";
import UserController from "./controllers/userController";
import UserModel from "./models/userModel";

const userController = new UserController(new UserModel(), new UserView);
userController.init();
