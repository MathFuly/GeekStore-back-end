import { staffRoute } from "./staffRoute";
import { DropController } from "./../controller/DropController";
import { DropUseCase } from "./../usecases/DropUseCase";
import { Router } from "express";
import { DropRepositoryImpl } from "../repositories/DropRepositoryImpl";
import { makeStaffLog } from "../../helpers/make-staff-log";

export const dropRoute = Router();

const dropRepository = new DropRepositoryImpl();
const dropUseCase = new DropUseCase(dropRepository);
const dropController = new DropController(dropUseCase);

staffRoute.post(
  "/drops/:id",
  makeStaffLog,
  dropController.updateDrop.bind(dropController)
);
staffRoute.delete(
  "/drops/:id",
  makeStaffLog,
  dropController.deleteDrop.bind(dropController)
);
staffRoute.get("/drops/:id", dropController.getDropById.bind(dropController));
staffRoute.post(
  "/drops",
  makeStaffLog,
  dropController.addDrop.bind(dropController)
);
staffRoute.get("/drops", dropController.getDrops.bind(dropController));
