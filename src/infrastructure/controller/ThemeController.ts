import { Request, Response } from "express";
import { getStaffRoleByToken } from "../../util/getStaffRoleByToken";
import { ThemeUseCase } from "../usecases/ThemeUseCase";

export class ThemeController {
  constructor(private readonly themeUseCase: ThemeUseCase) {}

  async addTheme(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const { dropcode, categoryid, slidebanner, pagebanner, logo, perfil } =
      req.body;

    if (
      !dropcode ||
      !categoryid ||
      !slidebanner ||
      !pagebanner ||
      !logo ||
      !perfil
    ) {
      return res
        .status(400)
        .json(
          "Os campos drop, categoia, banner de slide, banner de página, logo, perfil são obrigatorios!"
        );
    }

    const role = await getStaffRoleByToken(res, authorization);

    if (role == ("Marketing" || "Suporte" || "Gerente")) {
      return res.status(401).json("Acesso Negado!");
    }

    try {
      const data = {
        dropcode,
        categoryid,
        slidebanner,
        pagebanner,
        logo,
        perfil,
      };

      await this.themeUseCase.addTheme(data);

      return res.status(201).json(`O tema foi criado com sucesso!`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async updateTheme(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const { id } = req.params;
    const { slidebanner, pagebanner, logo, perfil } = req.body;

    if (!id) {
      return res.status(401).json("Não foi possível encontrar o tema!");
    }

    if (!slidebanner || !pagebanner || !logo || !perfil) {
      return res
        .status(400)
        .json(
          "Os campos drop, categoia, banner de slide, banner de página, logo, perfil são obrigatorio!"
        );
    }

    const role = await getStaffRoleByToken(res, authorization);

    if (role == ("Marketing" || "Suporte" || "Gerente")) {
      return res.status(401).json("Acesso Negado!");
    }

    try {
      const data = { slidebanner, pagebanner, logo, perfil };

      await this.themeUseCase.updateTheme(data, id);

      return res.status(201).json(`O tema foi atualizado com sucesso!`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async deleteTheme(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const { id } = req.params;

    if (!id) {
      return res.status(401).json("Não foi possível encontrar o tema!");
    }

    const role = await getStaffRoleByToken(res, authorization);

    if (role == ("Marketing" || "Suporte" || "Gerente")) {
      return res.status(401).json("Acesso Negado!");
    }

    try {
      await this.themeUseCase.deleteTheme(id);

      return res.status(201).json(`O tema foi deletado com sucesso!`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async getThemes(req: Request, res: Response): Promise<Response> {
    try {
      const themes = await this.themeUseCase.getThemes();

      return res.status(201).json(themes);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async getThemeById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json("Não foi possível encontrar o tema!");
    }

    try {
      const theme = await this.themeUseCase.getThemeById(id);

      return res.status(201).json(theme);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async getThemesByCode(req: Request, res: Response): Promise<Response> {
    const { code } = req.params;

    if (!code) {
      return res.status(401).json("Não foi possível encontrar o tema!");
    }

    try {
      const themes = await this.themeUseCase.getThemesByCode(code);

      return res.status(201).json(themes);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }
}
