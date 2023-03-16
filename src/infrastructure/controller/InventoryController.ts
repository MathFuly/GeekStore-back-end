import { Request, Response } from "express";
import { getStaffRoleByToken } from "../../util/getStaffRoleByToken";
import { InventoryUseCase } from "../usecases/InventoryUseCase";

export class InventoryController {
  constructor(private readonly inventoryUseCase: InventoryUseCase) {}

  async addInventory(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const {
      size,
      initial_inventory,
      current_inventory,
      discount,
      price,
      productid,
    } = req.body;

    if (
      !size ||
      !initial_inventory ||
      !current_inventory ||
      !price ||
      !productid
    ) {
      return res
        .status(400)
        .json(
          "Os campos tamanho, estoque ínicial, estoque atual, preço e produto são obrigatorios!"
        );
    }

    const role = await getStaffRoleByToken(res, authorization);

    if (role == ("Marketing" || "Suporte" || "Gerente")) {
      return res.status(401).json("Acesso Negado!");
    }

    try {
      const data = {
        size,
        initial_inventory,
        current_inventory,
        discount,
        price,
        productid,
      };

      await this.inventoryUseCase.addInventory(data);

      return res.status(201).json(`O inventáro foi criado com sucesso!`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async updateInventory(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const { id } = req.params;
    const { size, initial_inventory, current_inventory, discount, price } =
      req.body;

    if (!id) {
      return res.status(401).json("Não foi possível encontrar o invantário!");
    }

    if (
      !size ||
      !initial_inventory ||
      !current_inventory ||
      !discount ||
      !price
    ) {
      return res
        .status(400)
        .json(
          "Os campos tamanho, estoque ínicial, estoque atual, desconto e preço são obrigatorios!"
        );
    }

    const role = await getStaffRoleByToken(res, authorization);

    if (role == ("Marketing" || "Suporte" || "Gerente")) {
      return res.status(401).json("Acesso Negado!");
    }

    try {
      const data = {
        size,
        initial_inventory,
        current_inventory,
        discount,
        price,
      };

      await this.inventoryUseCase.updateInventory(data, id);

      return res.status(201).json(`O inventário foi atualizado com sucesso!`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async deleteInventory(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    const { id } = req.params;

    if (!id) {
      return res.status(401).json("Não foi possível encontrar o inventário!");
    }

    const role = await getStaffRoleByToken(res, authorization);

    if (role == ("Marketing" || "Suporte" || "Gerente")) {
      return res.status(401).json("Acesso Negado!");
    }

    try {
      await this.inventoryUseCase.deleteInventory(id);

      return res.status(201).json(`O inventário foi deletado com sucesso!`);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async getInventories(req: Request, res: Response): Promise<Response> {
    try {
      const inventories = await this.inventoryUseCase.getInventories();

      return res.status(201).json(inventories);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async getInventoryById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json("Não foi possível encontrar o inventário!");
    }

    try {
      const iventory = await this.inventoryUseCase.getInventoryById(id);

      return res.status(201).json(iventory);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }

  async getInventoriesByProductId(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json("Não foi possível encontrar o inventário!");
    }

    try {
      const inventories = await this.inventoryUseCase.getInventoryByProductId(
        id
      );

      return res.status(201).json(inventories);
    } catch (error: any) {
      return res.status(500).json({
        error,
        message:
          "Não foi possível completar a ação, tente novamente mais tarde.",
      });
    }
  }
}
