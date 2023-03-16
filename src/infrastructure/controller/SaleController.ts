import { Request, Response } from "express";
import { Sale } from "../../domain/models/Sale";
import { SaleUseCase } from "../usecases/SaleUseCase";

export class SaleController {
  constructor(private saleUseCase: SaleUseCase) {}

  async addSale(req: Request, res: Response): Promise<void> {
    const sales: Sale[] = req.body;

    try {
      await this.saleUseCase.addSale(sales);
      res.status(201).json({ message: "Vendas adicionadas com sucesso" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteSale(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);

      await this.saleUseCase.deleteSale(id);
      res.status(200).json({ message: "Venda removida com sucesso" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getSales(req: Request, res: Response): Promise<void> {
    try {
      const sales = await this.saleUseCase.getSales();
      if (sales === null) {
        res.status(404).json({ message: "Nenhuma venda encontrada" });
      } else {
        res.status(200).json(sales);
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getSalesByUserId(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const sales = await this.saleUseCase.getSalesByUserId(id);
      if (sales === null) {
        res
          .status(404)
          .json({ message: "Nenhuma venda encontrada para esse usuário" });
      } else {
        res.status(200).json(sales);
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  async getMostSales(req: Request, res: Response): Promise<void> {
    try {
      const sales = await this.saleUseCase.getMostSales();
      if (sales === null) {
        res.status(404).json({ message: "Nenhuma venda encontrada" });
      } else {
        res.status(200).json(sales);
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
