import { InventoryController } from "./../controller/InventoryController";
import { InventoryUseCase } from "./../usecases/InventoryUseCase";
import { Router } from "express";
import { InventoryRepositoryImpl } from "../repositories/InventoryRepositoryImpl";
import { makeStaffLog } from "../../helpers/make-staff-log";

export const invetoryRoute = Router();

const invetoryRepository = new InventoryRepositoryImpl();
const invetoryUseCase = new InventoryUseCase(invetoryRepository);
const invetoryController = new InventoryController(invetoryUseCase);

invetoryRoute.get(
  "/inventories/product/:id",
  invetoryController.getInventoriesByProductId.bind(invetoryController)
);
invetoryRoute.post(
  "/inventories/:id",
  makeStaffLog,
  invetoryController.updateInventory.bind(invetoryController)
);
invetoryRoute.delete(
  "/inventories/:id",
  makeStaffLog,
  invetoryController.deleteInventory.bind(invetoryController)
);
invetoryRoute.get(
  "/inventories/:id",
  invetoryController.getInventoryById.bind(invetoryController)
);
invetoryRoute.post(
  "/inventories",
  invetoryController.addInventory.bind(invetoryController)
);
invetoryRoute.get(
  "/inventories",
  invetoryController.getInventories.bind(invetoryController)
);
