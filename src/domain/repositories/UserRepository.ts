import { UserAuth } from "./../models/Auth";
import { User } from "../models/User";
import { Address } from "../models/Address";

export interface UserRepository {
  addUser(user: User): Promise<void>;
  updateUser(user: User, id: string): Promise<void>;
  updateUserPassword(
    newPassword: string,
    oldPassword: string,
    id: string
  ): Promise<void>;
  deleteUser(id: string): Promise<void>;
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User | null>;
  loginUser(email: string, password: string): Promise<UserAuth | null>;

  addUserAdress(address: Address): Promise<void>;
  updateUserAddress(address: Address): Promise<void>;
  deleteUserAddress(postalcode: string): Promise<void>;
  getUserAddressById(id: string): Promise<Address[] | null>;
}
