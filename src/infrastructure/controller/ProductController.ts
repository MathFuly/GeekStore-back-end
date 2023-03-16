import { Request, Response } from "express";
import { getStaffRoleByToken } from "../../util/getStaffRoleByToken";
import { ProductUseCase } from "./../usecases/ProductUseCase";

export class ProductController {
  constructor(private readonly productUseCase: ProductUseCase) {}

  async addProduct(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const { title, desc, image, type, dropcode, categoryId } = req.body;

    if (!title || !desc || !image || !type || !dropcode || !categoryId) {
      return res
        .status(400)
        .json(
          "Os campos title, descrição, imagem, tipo, drop e categoria são obrigatorios!"
        );
    }

    const role = await getStaffRoleByToken(res, authorization);

    if (role == ("Marketing" || "Suporte" || "Gerente")) {
      return res.status(401).json("Acesso Negado!");
    }

    try {
      const data = {
        title,
        desc,
        image,
        type,
        dropcode,
        categoryId,
      };

      await this.productUseCase.addProduct(data);

      return res.status(201).json(`O produto foi criado com sucesso!`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const { id } = req.params;
    const { title, desc, image, type, dropcode } = req.body;

    if (!id) {
      return res.status(401).json("Não foi possível encontrar o produto!");
    }

    if (!title || !desc || !image || !type || !dropcode) {
      return res
        .status(400)
        .json(
          "Os campos title, descrição, imagem, tipo, drop são obrigatorios!"
        );
    }

    const role = await getStaffRoleByToken(res, authorization);

    if (role == ("Marketing" || "Suporte" || "Gerente")) {
      return res.status(401).json("Acesso Negado!");
    }

    try {
      const data = { title, desc, image, type, dropcode };

      await this.productUseCase.updateProduct(data, id);

      return res.status(201).json(`O produto foi atualizado com sucesso!`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const { id } = req.params;

    if (!id) {
      return res.status(401).json("Não foi possível encontrar o produto!");
    }

    const role = await getStaffRoleByToken(res, authorization);

    if (role == ("Marketing" || "Suporte" || "Gerente")) {
      return res.status(401).json("Acesso Negado!");
    }

    try {
      await this.productUseCase.deleteProduct(id);

      return res.status(201).json(`O produto foi deletado com sucesso!`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async getProducts(req: Request, res: Response): Promise<Response> {
    try {
      const themes = await this.productUseCase.getProducts();

      return res.status(201).json(themes);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async getProductById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json("Não foi possível encontrar o produto!");
    }

    try {
      const product = await this.productUseCase.getProductById(id);

      return res.status(201).json(product);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async getProductByType(req: Request, res: Response): Promise<Response> {
    const { type } = req.params;

    if (!type) {
      return res.status(401).json("Não foi possível encontrar o produto!");
    }

    try {
      const products = await this.productUseCase.getProductByType(type);

      return res.status(201).json(products);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async getProductsByCategory(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json("Não foi possível encontrar o produto!");
    }

    try {
      const products = await this.productUseCase.getProductsByCategory(id);

      return res.status(201).json(products);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }
  async getProductsBySearch(req: Request, res: Response): Promise<Response> {
    const { search } = req.params;

    if (!search) {
      return res.status(401).json("Não foi possível encontrar o produto!");
    }

    try {
      const products = await this.productUseCase.getProductsBySearch(search);

      return res.status(201).json(products);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }
}
