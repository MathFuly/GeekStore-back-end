import { CategoryUseCase } from "./../usecases/CategoryUseCase";
import { Request, Response } from "express";
import { getStaffRoleByToken } from "../../util/getStaffRoleByToken";

export class CategoryController {
  constructor(private readonly categoryUseCase: CategoryUseCase) {}

  async addCategory(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json("O campo title é obrigatorio!");
    }

    const role = await getStaffRoleByToken(res, authorization);

    if (role == ("Marketing" || "Suporte" || "Gerente")) {
      return res.status(401).json("Acesso Negado!");
    }

    try {
      const data = { title };

      await this.categoryUseCase.addCategory(data);

      return res.status(201).json(`A categoria foi criada com sucesso!`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async updateCategory(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const { id } = req.params;
    const { title } = req.body;

    if (!id) {
      return res.status(401).json("Não foi possível encontrar a categoria!");
    }

    if (!title) {
      return res.status(400).json("O campo title é obrigatorio!");
    }

    const role = await getStaffRoleByToken(res, authorization);

    if (role == ("Marketing" || "Suporte" || "Gerente")) {
      return res.status(401).json("Acesso Negado!");
    }

    try {
      const data = { title };

      await this.categoryUseCase.updateCategory(data, id);

      return res.status(201).json(`A categoria foi atualizada com sucesso!`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async deleteCategory(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const { id } = req.params;

    if (!id) {
      return res.status(401).json("Não foi possível encontrar a categoria!");
    }

    const role = await getStaffRoleByToken(res, authorization);

    if (role == ("Marketing" || "Suporte" || "Gerente")) {
      return res.status(401).json("Acesso Negado!");
    }

    try {
      await this.categoryUseCase.deleteCategory(id);

      return res.status(201).json(`A categoria foi deletada com sucesso!`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async getCategories(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const categories = await this.categoryUseCase.getCategories();

      return res.status(201).json(categories);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async getCategoryById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json("Não foi possível encontrar a categoria!");
    }

    try {
      const category = await this.categoryUseCase.getCategoryById(id);

      return res.status(201).json(category);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }
}
