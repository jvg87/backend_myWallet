import { UserRepository } from "../../repository/User/UserRepository";
import { AuthUserService } from "../../services/User/AuthUser/AuthUserService";
import { CreateUserService } from "../../services/User/CreateUser/CreateUserService";
import { DetailUserService } from "../../services/User/DetailUser/DetailUserService";
import { UpdateUserService } from "../../services/User/UpdateUser/UpdateUserService";
import { AuthUserController } from "./AuthUser/AuthUserController";
import { CreateUserController } from "./CreateUser/CreateUserController";
import { DetailUserController } from "./DetailUser/DetailUserController";
import { UpdateUserController } from "./UpdateUser/UpdateUserController";

const userRepository = new UserRepository();

const createUserService = new CreateUserService(userRepository);
const createUserController = new CreateUserController(createUserService);

const authUserService = new AuthUserService(userRepository);
const authUserController = new AuthUserController(authUserService);

const detailUserService = new DetailUserService(userRepository);
const detailUserController = new DetailUserController(detailUserService);

const updateUserService = new UpdateUserService(userRepository);
const updateUserController = new UpdateUserController(updateUserService);

export {
  authUserController,
  createUserController,
  detailUserController,
  updateUserController,
};
