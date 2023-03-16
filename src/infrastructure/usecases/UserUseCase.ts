import { UserAuth } from "./../../domain/models/Auth";
import { User } from "../../domain/models/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { Address } from "../../domain/models/Address";

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async addUser(user: User): Promise<void> {
    if (!user) throw new Error("Não foi possível criar o usuário.");

    await this.userRepository.addUser(user);
  }

  async updateUser(user: User, id: string): Promise<void> {
    if (!user || !id) {
      throw new Error("Não foi possível atualizar o usuário.");
    }

    await this.userRepository.updateUser(user, id);
  }

  async updateUserPassword(
    newPassword: string,
    oldPassword: string,
    id: string
  ): Promise<void> {
    if (!newPassword || !oldPassword || !id) {
      throw new Error("Não foi possível atualizar a senha.");
    }

    await this.userRepository.updateUserPassword(newPassword, oldPassword, id);
  }

  async deleteUser(id: string): Promise<void> {
    if (!id) {
      throw new Error("Não foi possível deletar o usuário.");
    }

    await this.userRepository.deleteUser(id);
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.getUsers();

    return users;
  }

  async getUserById(id: string): Promise<User | null> {
    if (!id) {
      throw new Error("Não foi possível encontrar o usuário.");
    }

    const user = await this.userRepository.getUserById(id);

    return user;
  }

  async loginUser(email: string, password: string): Promise<UserAuth | null> {
    const auth = await this.userRepository.loginUser(email, password);

    return auth;
  }

  async addUserAdress(address: Address): Promise<void> {
    if (!address) {
      throw new Error("Não foi possível encontrar o endereço.");
    }

    await this.userRepository.addUserAdress(address);
  }

  async updateUserAddress(address: Address): Promise<void> {
    if (!address) {
      throw new Error("Não foi possível encontrar o endereço.");
    }

    await this.userRepository.updateUserAddress(address);
  }

  async deleteUserAddress(postalcode: string): Promise<void> {
    if (!postalcode) {
      throw new Error("Não foi possível encontrar o endereço.");
    }

    await this.userRepository.deleteUserAddress(postalcode);
  }

  async getUserAddressById(id: string): Promise<Address[] | null> {
    if (!id) {
      throw new Error("Não foi possível encontrar o endereço.");
    }

    const user = await this.userRepository.getUserAddressById(id);

    return user;
  }
}
