import { prisma } from "../../database/prismaClient";
import { Category } from "../../domain/models/Category";
import { CategoryRepository } from "./../../domain/repositories/CategoryRepository";

export class CategoryRepositoryImpl implements CategoryRepository {
  async addCategory(category: Category): Promise<void> {
    await prisma.category.create({
      data: {
        title: category.title,
      },
    });
  }

  async updateCategory(category: Category, id: string): Promise<void> {
    await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        title: category.title,
      },
    });
  }

  async deleteCategory(id: string): Promise<void> {
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });
  }

  async getCategories(): Promise<Category[]> {
    const categories = await prisma.category.findMany();

    return categories;
  }

  async getCategoryById(id: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    return category;
  }
}
