import { Request, Response } from "express";
import { getStaffRoleByToken } from "../../util/getStaffRoleByToken";
import { DropUseCase } from "./../usecases/DropUseCase";

export class DropController {
  constructor(private readonly dropUseCase: DropUseCase) {}

  async addDrop(req: Request, res: Response): Promise<Response> {
    const { code } = req.body;
    const { authorization } = req.headers;

    if (!code) {
      return res.status(400).json("O campo code é obrigatorio!");
    }

    const role = await getStaffRoleByToken(res, authorization);

    if (role == ("Marketing" || "Suporte" || "Gerente")) {
      return res.status(401).json("Acesso Negado!");
    }

    try {
      const data = { code };

      await this.dropUseCase.addDrop(data);

      return res.status(201).json(`A drop, ${code}, foi criado com sucesso!`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async updateDrop(req: Request, res: Response): Promise<Response> {
    const { code } = req.body;
    const { id } = req.params;
    const { authorization } = req.headers;

    if (!id) {
      return res.status(401).json("Não foi possível encontrar o drop!");
    }

    if (!code) {
      return res.status(400).json("O campo code é obrigatorio!");
    }

    const role = await getStaffRoleByToken(res, authorization);

    if (role == ("Marketing" || "Suporte" || "Gerente")) {
      return res.status(401).json("Acesso Negado!");
    }

    try {
      const data = { code };

      await this.dropUseCase.updateDrop(data, id);

      return res
        .status(201)
        .json(`A drop, ${code}, foi atualizado com sucesso!`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async deleteDrop(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { authorization } = req.headers;

    if (!id) {
      return res.status(401).json("Não foi possível encontrar o drop!");
    }

    const role = await getStaffRoleByToken(res, authorization);

    if (role == ("Marketing" || "Suporte" || "Gerente")) {
      return res.status(401).json("Acesso Negado!");
    }

    try {
      await this.dropUseCase.deleteDrop(id);

      return res.status(201).json(`A drop foi deletado com sucesso!`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async getDrops(req: Request, res: Response): Promise<Response> {
    try {
      const drops = await this.dropUseCase.getDrops();

      return res.status(201).json(drops);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async getDropById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { authorization } = req.headers;

    if (!id) {
      return res.status(401).json("Não foi possível encontrar o drop!");
    }

    try {
      const drop = await this.dropUseCase.getDropById(id);

      return res.status(201).json(drop);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }
}
