import { UserController } from "../controller/UserController";
import { UserUseCase } from "../usecases/UserUseCase";
import { UserRepositoryImpl } from "../repositories/UserRepositoryImpl";
import { Router } from "express";

export const userRoute = Router();

const userRepository = new UserRepositoryImpl();
const userUseCase = new UserUseCase(userRepository);
const userControlller = new UserController(userUseCase);

userRoute.post(
  "/users/address/update",
  userControlller.updateUserAddress.bind(userControlller)
);
userRoute.delete(
  "/users/address/:postalcode",
  userControlller.deleteUserAddress.bind(userControlller)
);
userRoute.get(
  "/users/address/:id",
  userControlller.getUserAddressById.bind(userControlller)
);
userRoute.post(
  "/users/address",
  userControlller.addUserAdress.bind(userControlller)
);
userRoute.post(
  "/users/password/:id",

  userControlller.updateUserPassword.bind(userControlller)
);
userRoute.post("/users/login", userControlller.loginUser.bind(userControlller));
userRoute.get(
  "/users/:id",

  userControlller.getUserById.bind(userControlller)
);
userRoute.post(
  "/users/:id",

  userControlller.updateUser.bind(userControlller)
);
userRoute.delete(
  "/users/:id",

  userControlller.deleteUser.bind(userControlller)
);
userRoute.post("/users", userControlller.addUser.bind(userControlller));
userRoute.get("/users", userControlller.getUsers.bind(userControlller));
