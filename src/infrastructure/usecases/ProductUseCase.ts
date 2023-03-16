import { Product } from "../../domain/models/Product";
import { ProductRepository } from "./../../domain/repositories/ProductRepository";

export class ProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async addProduct(product: Product): Promise<void> {
    if (!product) throw new Error("Não foi possível criar o tema.");

    await this.productRepository.addProduct(product);
  }

  async updateProduct(product: Product, id: string): Promise<void> {
    if (!product || !id) throw new Error("Não foi possível criar o tema.");

    await this.productRepository.updateProduct(product, id);
  }

  async deleteProduct(id: string): Promise<void> {
    if (!id) throw new Error("Não foi possível criar o tema.");

    await this.productRepository.deleteProduct(id);
  }

  async getProducts(): Promise<Product[]> {
    const products = await this.productRepository.getProducts();

    return products;
  }

  async getProductById(id: string): Promise<Product | null> {
    if (!id) throw new Error("Não foi possível criar o tema.");

    const product = await this.productRepository.getProductById(id);

    return product;
  }

  async getProductByType(type: string): Promise<Product[] | null> {
    if (!type) throw new Error("Não foi possível criar o tema.");

    const products = await this.productRepository.getProductbyType(type);

    return products;
  }

  async getProductsByCategory(id: string): Promise<Product[] | null> {
    if (!id) throw new Error("Não foi possível criar o tema.");

    const products = await this.productRepository.getProductsByCategory(id);

    return products;
  }

  async getProductsBySearch(search: string): Promise<Product[] | null> {
    if (!search) throw new Error("Não foi possível criar o tema.");

    const products = await this.productRepository.getProductsBySearch(search);

    return products;
  }
}
