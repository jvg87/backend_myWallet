import { UserRepository } from "../../repository/User/UserRepository";
import { AuthUserService } from "../../services/User/AuthUser/AuthUserService";
import { CreateUserService } from "../../services/User/CreateUser/CreateUserService";
import { DetailUserService } from "../../services/User/DetailUser/DetailUserService";
import { AuthUserController } from "./AuthUser/AuthUserController";
import { CreateUserController } from "./CreateUser/CreateUserController";
import { DetailUserController } from "./DetailUser/DetailUserController";

const userRepository = new UserRepository();

const createUserService = new CreateUserService(userRepository);
const createUserController = new CreateUserController(createUserService);

const authUserService = new AuthUserService(userRepository);
const authUserController = new AuthUserController(authUserService);

const detailUserService = new DetailUserService(userRepository);
const detailUserController = new DetailUserController(detailUserService);

export { authUserController, createUserController, detailUserController };
