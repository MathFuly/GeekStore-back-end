import { prisma } from "../../database/prismaClient";
import { UserAuth } from "../../domain/models/Auth";
import { User } from "../../domain/models/User";
import { UserRepository } from "./../../domain/repositories/UserRepository";
import bcrypt, { compare } from "bcrypt";
import { Address } from "../../domain/models/Address";
import { comparePassword } from "../../util/comparePassword";
import { encryptPassword } from "../../util/encryptPassword";

export class UserRepositoryImpl implements UserRepository {
  async addUser(user: User): Promise<void> {
    if (!user.password || !user.cpf)
      throw new Error("Informe todos os campos!");

    await prisma.user.create({
      data: {
        name: user.name,
        lastname: user.lastname,
        image: user.image,
        cpf: user.cpf,
        password: user.password,
        email: user.email,
        phone1: user.phone1,
        phone2: user.phone2,
      },
    });
  }

  async updateUser(user: User, id: string): Promise<void> {
    await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name: user.name,
        lastname: user.lastname,
        image: user.image,
        email: user.email,
        phone1: user.phone1,
        phone2: user.phone2,
      },
    });
  }

  async updateUserPassword(
    newPassword: string,
    oldPassword: string,
    id: string
  ): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: { password: true },
    });

    const isValid = comparePassword(oldPassword, user?.password);

    if (!isValid) throw new Error("As senhas não coincidem");

    const hash = await encryptPassword(newPassword);

    await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        password: hash,
      },
    });
  }

  async deleteUser(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
  }

  async getUsers(): Promise<User[]> {
    const user = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        lastname: true,
        password: false,
        image: true,
        email: true,
        phone1: true,
        phone2: true,
        created_at: true,
      },
    });

    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
        password: false,
        cpf: true,
        image: true,
        phone1: true,
        phone2: true,
        created_at: true,
        Address: true,
      },
    });

    return user;
  }

  async loginUser(email: string, password: string): Promise<UserAuth | null> {
    const user = await prisma.user.findFirst({
      where: { email: email },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        password: true,
      },
    });

    if (!user) throw new Error("O usuário não existe!");

    const checkPassword = await bcrypt.compare(password, user?.password);

    if (!checkPassword) throw new Error("CPF ou senha inválida!");

    const data = {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
    };

    return data;
  }

  async addUserAdress(address: Address): Promise<void> {
    if (!address.postalcode || !address.complement || !address.userid)
      throw new Error("Informe todos os campos!");

    await prisma.address.create({
      data: {
        address: address.address,
        neighborhood: address.neighborhood,
        postalcode: address.postalcode,
        complement: address.complement,
        number: address.number,
        userid: address.userid,
      },
    });
  }
  async updateUserAddress(address: Address): Promise<void> {
    if (!address.postalcode || !address.complement)
      throw new Error("Informe todos os campos!");

    await prisma.address.update({
      where: { postalcode: address.postalcode },
      data: {
        address: address.address,
        neighborhood: address.neighborhood,
        postalcode: address.postalcode,
        complement: address.complement,
        number: address.number,
      },
    });
  }

  async deleteUserAddress(postalcode: string): Promise<void> {
    if (!postalcode) throw new Error("Informe todos os campos!");

    console.log(postalcode);

    await prisma.address.delete({
      where: { postalcode: postalcode },
    });
  }

  async getUserAddressById(id: string): Promise<Address[] | null> {
    if (!id) throw new Error("Endereço não encontrado!");

    const data = await prisma.address.findMany({
      where: { userid: parseInt(id) },
    });

    return data;
  }
}
