import { Request, Response } from "express";
import { createUserToken } from "../../util/createToken";
import { encryptPassword } from "../../util/encryptPassword";
import { UserUseCase } from "./../usecases/UserUseCase";

export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  async addUser(req: Request, res: Response): Promise<Response> {
    const { name, lastname, cpf, password, email, phone1, phone2 } = req.body;

    if (!name || !lastname || !cpf || !password || !email || !phone1) {
      return res
        .status(400)
        .json(
          "Os campos nome, sobrenome, cpf, email, telefone, imagem e senha  são obrigatorios!"
        );
    }

    try {
      const data = {
        name,
        lastname,
        cpf,
        password: await encryptPassword(password),
        email,
        phone1,
        phone2,
      };

      await this.userUseCase.addUser(data);

      return res.status(201).json(`O usuário foi cadastrado com sucesso!`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { name, lastname, image, email, phone1, phone2 } = req.body;

    if (!id) {
      return res.status(401).json("Não foi possível encontrar o usuário!");
    }

    if (!name || !lastname || !email || !phone1 || !image) {
      return res
        .status(401)
        .json(
          "Os campos nome, sobrenome, cpf, e-mail, telefone e imagem são obrigatorios!"
        );
    }

    try {
      const data = {
        name,
        lastname,
        image,
        email,
        phone1,
        phone2,
      };

      await this.userUseCase.updateUser(data, id);

      return res.status(201).json(`O usuário foi atualizado com sucesso.`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async updateUserPassword(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { newPassword, oldPassword } = req.body;

    if (!id) {
      return res.status(401).json("Não foi possível encontrar o usuário!");
    }

    if (!newPassword || !oldPassword) {
      return res.status(401).json("Preencha todos os campos!");
    }

    try {
      await this.userUseCase.updateUserPassword(newPassword, oldPassword, id);

      return res
        .status(201)
        .json(`A senha do usuário foi atualizada com sucesso.`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      res.status(400).json("Não foi possível encontrar o usuário!");
    }

    try {
      await this.userUseCase.deleteUser(id);

      return res.status(201).json(`O usuário foi deletado com sucesso.`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userUseCase.getUsers();

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json("Não foi possível encontrar o usuário!");
    }

    try {
      const user = await this.userUseCase.getUserById(id);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async loginUser(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json("CPF ou senha inválidos!");
    }

    try {
      const auth = await this.userUseCase.loginUser(email, password);

      const authWithToken = await createUserToken(auth);

      return res.status(200).json(authWithToken);
    } catch (error) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async addUserAdress(req: Request, res: Response): Promise<Response> {
    const { userid, postalcode, address, neighborhood, complement, number } =
      req.body;

    if (
      !userid ||
      !postalcode ||
      !address ||
      !neighborhood ||
      !complement ||
      !number
    ) {
      return res.status(400).json("Preencha todos os campos!");
    }

    try {
      const data = {
        userid,
        postalcode,
        address,
        neighborhood,
        complement,
        number,
      };

      await this.userUseCase.addUserAdress(data);

      return res.status(201).json(`O endereço foi adicionado com sucesso!`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async updateUserAddress(req: Request, res: Response): Promise<Response> {
    const { postalcode, address, neighborhood, complement, number } = req.body;

    if (!postalcode || !address || !neighborhood || !complement || !number) {
      return res.status(400).json("Preencha todos os campos!");
    }

    try {
      const data = {
        postalcode,
        address,
        neighborhood,
        complement,
        number,
      };

      await this.userUseCase.updateUserAddress(data);

      return res.status(201).json(`O endereço foi atualizado com sucesso!`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async deleteUserAddress(req: Request, res: Response): Promise<Response> {
    const { postalcode } = req.params;

    if (!postalcode) {
      return res.status(400).json("Não foi possível encontrar o endereço!");
    }

    try {
      await this.userUseCase.deleteUserAddress(postalcode);

      return res.status(201).json(`O endereço foi deletado com sucesso!`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async getUserAddressById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json("Não foi possível encontrar o endereço!");
    }

    try {
      const data = await this.userUseCase.getUserAddressById(id);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }
}
