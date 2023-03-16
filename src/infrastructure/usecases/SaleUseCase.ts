import { Product } from "../../domain/models/Product";
import { Sale } from "../../domain/models/Sale";
import { SaleRepository } from "../../domain/repositories/SaleRepository";

export class SaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async addSale(sales: Sale[]): Promise<void> {
    if (sales.length === 0) {
      throw new Error("Nenhuma venda para ser adicionada");
    }

    await this.saleRepository.addSale(sales);
  }

  async deleteSale(id: number): Promise<void> {
    if (!id) {
      throw new Error("Não foi possível encontrar a compra.");
    }

    await this.saleRepository.deleteSale(id);
  }

  async getSales(): Promise<Sale[] | null> {
    return await this.saleRepository.getSales();
  }

  async getSalesByUserId(id: number): Promise<Sale[] | null> {
    if (!id) {
      throw new Error("Não foi possível encontrar o usuário e suas compras.");
    }

    return await this.saleRepository.getSalesByUserId(id);
  }
  async getMostSales(): Promise<Product[] | null> {
    return await this.saleRepository.getMostSales();
  }
}
