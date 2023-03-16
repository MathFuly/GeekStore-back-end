import { CategoryRepository } from "./../../domain/repositories/CategoryRepository";
import { Category } from "../../domain/models/Category";

export class CategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async addCategory(category: Category): Promise<void> {
    if (!category) throw new Error("Não foi possível criar a categoria.");

    await this.categoryRepository.addCategory(category);
  }

  async updateCategory(category: Category, id: string): Promise<void> {
    if (!category || !id)
      throw new Error("Não foi possível atualizar a categoria.");

    await this.categoryRepository.updateCategory(category, id);
  }

  async deleteCategory(id: string): Promise<void> {
    if (!id) throw new Error("Não foi possível deletar a categoria.");

    await this.categoryRepository.deleteCategory(id);
  }

  async getCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.getCategories();

    return categories;
  }

  async getCategoryById(id: string): Promise<Category | null> {
    if (!id) throw new Error("Não foi possível encontrar a categoria.");

    const category = await this.categoryRepository.getCategoryById(id);

    return category;
  }
}
