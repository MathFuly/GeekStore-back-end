import { prisma } from "../../database/prismaClient";
import { Product } from "../../domain/models/Product";
import { ProductRepository } from "./../../domain/repositories/ProductRepository";

export class ProductRepositoryImpl implements ProductRepository {
  async addProduct(product: Product): Promise<void> {
    if (!product.categoryId) {
      throw new Error("A categoria é obrigatoria!");
    }

    await prisma.product.create({
      data: {
        title: product.title,
        desc: product.desc,
        image: product.image,
        type: product.type,
        dropcode: product.dropcode,
        ProductCategory: {
          create: {
            categoryid: product.categoryId,
          },
        },
      },
    });
  }

  async updateProduct(product: Product, id: string): Promise<void> {
    await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        title: product.title,
        desc: product.desc,
        image: product.image,
        type: product.type,
        dropcode: product.dropcode,
      },
    });
  }

  async deleteProduct(id: string): Promise<void> {
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });
  }

  async getProducts(): Promise<Product[]> {
    const products = await prisma.product.findMany({
      include: {
        inventory: true,
        ProductCategory: {
          select: {
            category: { select: { id: true, title: true, theme: true } },
            categoryid: false,
            productid: false,
          },
        },
      },
    });
    return products;
  }

  async getProductById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        inventory: true,
        ProductCategory: {
          select: {
            category: { include: { theme: true } },
            categoryid: false,
            productid: false,
          },
        },
      },
    });
    return product;
  }

  async getProductbyType(type: string): Promise<Product[] | null> {
    const products = await prisma.product.findMany({
      where: { type },
      include: {
        inventory: true,
        ProductCategory: {
          select: {
            category: { include: { theme: true } },
            categoryid: false,
            productid: false,
          },
        },
      },
    });

    const filterProduct = products.filter((p) =>
      p.inventory.filter((inv) => Number(inv.current_inventory) > 0)
    );

    return filterProduct;
  }

  async getProductsByCategory(id: string): Promise<Product[] | null> {
    const products = await prisma.product.findMany({
      where: { ProductCategory: { categoryid: parseInt(id) } },
      include: {
        inventory: true,
        ProductCategory: {
          select: {
            category: { include: { theme: true } },
            categoryid: false,
            productid: false,
          },
        },
      },
    });

    return products;
  }

  async getProductsBySearch(search: string): Promise<Product[] | null> {
    console.log(search)

    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      include: {
        inventory: true,
        ProductCategory: {
          select: {
            category: { include: { theme: true } },
            categoryid: false,
            productid: false,
          },
        },
      },
    });

    return products;
  }
}
