import { Inventory } from "../../domain/models/Inventory";
import { InventoryRepository } from "../../domain/repositories/IventoryRepository";

export class InventoryUseCase {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async addInventory(inventory: Inventory): Promise<void> {
    if (!inventory) throw new Error("Não foi possível criar o tema.");

    await this.inventoryRepository.addInventory(inventory);
  }

  async updateInventory(inventory: Inventory, id: string): Promise<void> {
    if (!inventory || !id) throw new Error("Não foi possível criar o tema.");

    await this.inventoryRepository.updateInventory(inventory, id);
  }

  async deleteInventory(id: string): Promise<void> {
    if (!id) throw new Error("Não foi possível criar o tema.");

    await this.inventoryRepository.deleteInventory(id);
  }

  async getInventories(): Promise<Inventory[]> {
    const inventories = await this.inventoryRepository.getInventories();

    return inventories;
  }

  async getInventoryById(id: string): Promise<Inventory | null> {
    if (!id) throw new Error("Não foi possível criar o tema.");

    const inventory = await this.inventoryRepository.getInventoryById(id);

    return inventory;
  }

  async getInventoryByProductId(id: string): Promise<Inventory[] | null> {
    if (!id) throw new Error("Não foi possível criar o tema.");

    const inventories = await this.inventoryRepository.getInventoryByProductId(
      id
    );

    return inventories;
  }
}
