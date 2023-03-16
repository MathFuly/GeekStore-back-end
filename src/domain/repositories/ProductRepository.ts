import { Product } from "../models/Product";

export interface ProductRepository {
  addProduct(product: Product): Promise<void>;
  updateProduct(product: Product, id: string): Promise<void>;
  deleteProduct(id: string): Promise<void>;
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  getProductbyType(type: string): Promise<Product[] | null>;
  getProductsByCategory(id: string): Promise<Product[] | null>;
  getProductsBySearch(search: string): Promise<Product[] | null>;
}
