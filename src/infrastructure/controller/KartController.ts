import { Request, Response } from "express";
import { KartUseCase } from "./../usecases/KartUseCase";

export class KartController {
  constructor(private readonly kartUseCase: KartUseCase) {}

  async addKart(req: Request, res: Response): Promise<Response> {
    const { userid, size, productid, quantity, price, discount } = req.body;

    if (!userid || !size || !productid || !quantity || !price || !discount) {
      return res
        .status(400)
        .json(
          "O usuário, tamanho, produto, quantidade, preço e desconto devem ser informados."
        );
    }

    try {
      const data = { userid, size, productid, quantity, price, discount };

      await this.kartUseCase.addKart(data);

      return res.status(201).json(`O produto foi adicionado ao carrinho!`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async incrementKart(req: Request, res: Response): Promise<Response> {
    const {id} = req.body;

    if (!id) {
      return res.status(400).json("Não foi possível encontar o carrinho.");
    }

    try {
      await this.kartUseCase.incrementKart(id);

      return res
        .status(201)
        .json(`A quantidade do produto foi atualizada com sucesso!`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async decrementKart(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json("Não foi possível encontar o carrinho.");
    }

    try {
      await this.kartUseCase.decrementKart(id);

      return res
        .status(201)
        .json(`A quantidade do produto foi atualizada com sucesso!`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async deleteKart(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json("Não foi possível encontar o carrinho.");
    }

    try {
      await this.kartUseCase.deleteKart(id);

      return res.status(201).json(`O carrinho foi deletado com sucesso!`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async getKartsByUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json("Não foi possível encontar o usuário.");
    }

    try {
      const data = await this.kartUseCase.getKartsByUser(id);

      return res.status(201).json(data);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }
}
