import { prisma } from "../../database/prismaClient";
import { Inventory } from "../../domain/models/Inventory";
import { InventoryRepository } from "./../../domain/repositories/IventoryRepository";

export class InventoryRepositoryImpl implements InventoryRepository {
  async addInventory(inventory: Inventory): Promise<void> {
    if (!inventory.productid) {
      throw new Error("O produto é obrigatorio!");
    }

    await prisma.inventory.create({
      data: {
        size: inventory.size,
        initial_inventory: inventory.initial_inventory,
        current_inventory: inventory.current_inventory,
        discount: inventory.discount,
        price: inventory.price,
        productid: inventory.productid,
      },
    });
  }

  async updateInventory(inventory: Inventory, id: string): Promise<void> {
    await prisma.inventory.update({
      where: { id: parseInt(id) },
      data: {
        size: inventory.size,
        initial_inventory: inventory.initial_inventory,
        current_inventory: inventory.current_inventory,
        discount: inventory.discount,
        price: inventory.price,
      },
    });
  }

  async deleteInventory(id: string): Promise<void> {
    await prisma.inventory.delete({
      where: { id: parseInt(id) },
    });
  }

  async getInventories(): Promise<Inventory[]> {
    const invetories = await prisma.inventory.findMany();

    return invetories;
  }

  async getInventoryById(id: string): Promise<Inventory | null> {
    const inventory = await prisma.inventory.findUnique({
      where: { id: parseInt(id) },
    });

    return inventory;
  }

  async getInventoryByProductId(id: string): Promise<Inventory[] | null> {
    const inventories = await prisma.inventory.findMany({
      where: { productid: parseInt(id) },
    });

    return inventories;
  }
}
