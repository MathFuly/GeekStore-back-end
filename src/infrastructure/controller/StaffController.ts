import { Response, Request } from "express";
import { createStaffToken } from "../../util/createToken";
import { encryptPassword } from "../../util/encryptPassword";
import { getStaffRoleByToken } from "../../util/getStaffRoleByToken";
import { StaffUseCase } from "./../usecases/StaffUseCase";

export class StaffController {
  constructor(private readonly staffUseCase: StaffUseCase) {}

  async addStaff(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const { name, lastname, cpf, role, image, password } = req.body;

    if (!name || !lastname || !cpf || !role || !image || !password) {
      return res
        .status(400)
        .json(
          "Os campos nome, sobrenome, cpf, cargo, imagem e senha  são obrigatorios!"
        );
    }

    const staffRole = await getStaffRoleByToken(res, authorization);

    if (staffRole != "Administrador") {
      return res.status(401).json("Acesso Negado!");
    }

    try {
      const data = {
        name,
        lastname,
        cpf,
        role,
        image,
        password: await encryptPassword(password),
      };

      const createdStaff = await this.staffUseCase.addStaff(data);

      return res
        .status(201)
        .json(`O usuário, ${createdStaff}, foi cadastrado com sucesso!`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async updateStaff(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { authorization } = req.headers;

    const { name, lastname, cpf, role, image } = req.body;

    if (!id) {
      return res.status(401).json("Não foi possível encontrar o usuário!");
    }

    if (!name || !lastname || !cpf || !role || !image) {
      return res
        .status(401)
        .json(
          "Os campos nome, sobrenome, cpf, cargo e imagem são obrigatorios!"
        );
    }

    const staffRole = await getStaffRoleByToken(res, authorization);

    if (staffRole != "Administrador") {
      return res.status(401).json("Acesso Negado!");
    }

    try {
      const data = {
        name,
        lastname,
        cpf,
        role,
        image,
      };

      const createdStaff = await this.staffUseCase.updateStaff(data, id);

      return res
        .status(201)
        .json(`O usuário, ${createdStaff}, foi atualizado com sucesso.`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async deleteStaff(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { authorization } = req.headers;

    if (!id) {
      res.status(400).json("Não foi possível encontrar o usuário!");
    }

    const staffRole = await getStaffRoleByToken(res, authorization);

    if (staffRole != "Administrador") {
      return res.status(401).json("Acesso Negado!");
    }

    try {
      await this.staffUseCase.deleteStaff(id);

      return res.status(201).json(`O usuário foi deletado com sucesso.`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async getStaff(req: Request, res: Response): Promise<Response> {
    try {
      const staff = await this.staffUseCase.getStaff();

      return res.status(200).json(staff);
    } catch (error) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async getStaffById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json("Não foi possível encontrar o usuário!");
    }

    try {
      const staff = await this.staffUseCase.getStaffById(id);

      return res.status(200).json(staff);
    } catch (error) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async loginStaff(req: Request, res: Response): Promise<Response> {
    const { cpf, password } = req.body;

    if (!cpf || !password) {
      return res.status(401).json("CPF ou senha inválidos!");
    }

    try {
      const auth = await this.staffUseCase.loginStaff(cpf, password);

      const authWithToken = await createStaffToken(auth);

      return res.status(200).json(authWithToken);
    } catch (error) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }
}
