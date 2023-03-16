import { Inventory } from "../models/Inventory";

export interface InventoryRepository {
  addInventory(inventory: Inventory): Promise<void>;
  updateInventory(inventory: Inventory, id: string): Promise<void>;
  deleteInventory(id: string): Promise<void>;
  getInventories(): Promise<Inventory[]>;
  getInventoryById(id: string): Promise<Inventory | null>;
  getInventoryByProductId(id: string): Promise<Inventory[] | null>;
}