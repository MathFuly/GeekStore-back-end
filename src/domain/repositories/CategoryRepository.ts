import { Category } from "../models/Category";

export interface CategoryRepository {
  addCategory(category: Category): Promise<void>;
  updateCategory(category: Category, id: string): Promise<void>;
  deleteCategory(id: string): Promise<void>;
  getCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | null>;
}
