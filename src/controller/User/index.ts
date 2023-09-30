import { UserRepository } from "../../repository/User/UserRepository";
import { CreateUserService } from "../../services/User/CreateUser/CreateUserService";
import { CreateUserController } from "./CreateUser/CreateUserController";

const userRepository = new UserRepository();

const createUserService = new CreateUserService(userRepository);

const createUserController = new CreateUserController(createUserService);

export { createUserController };
