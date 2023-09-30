import { UserRepository } from "../../repository/User/UserRepository";
import { AuthUserService } from "../../services/User/AuthUser/AuthUserService";
import { CreateUserService } from "../../services/User/CreateUser/CreateUserService";
import { AuthUserController } from "./AuthUser/AuthUserController";
import { CreateUserController } from "./CreateUser/CreateUserController";

const userRepository = new UserRepository();

const createUserService = new CreateUserService(userRepository);
const createUserController = new CreateUserController(createUserService);

const authUserService = new AuthUserService(userRepository);
const authUserController = new AuthUserController(authUserService);

export { authUserController, createUserController };
