import { KartController } from "./../controller/KartController";
import { KartUseCase } from "./../usecases/KartUseCase";
import { KartRepositoryImpl } from "./../repositories/KartRepositoryImpl";
import { Router } from "express";

export const kartRoute = Router();

const kartRepository = new KartRepositoryImpl();
const kartUseCase = new KartUseCase(kartRepository);
const kartController = new KartController(kartUseCase);

kartRoute.get(
  "/kart/user/:id",
  kartController.getKartsByUser.bind(kartController)
);
kartRoute.post(
  "/kart/increment",
  kartController.incrementKart.bind(kartController)
);
kartRoute.post(
  "/kart/decrement",
  kartController.decrementKart.bind(kartController)
);
kartRoute.delete("/kart/:id", kartController.deleteKart.bind(kartController));
kartRoute.post("/kart", kartController.addKart.bind(kartController));
