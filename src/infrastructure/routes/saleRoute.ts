import { Router } from "express";
import { SaleController } from "../controller/SaleController";
import { SaleRepositoryImpl } from "../repositories/SaleRepositoryImpl";
import { SaleUseCase } from "./../usecases/SaleUseCase";

const saleRepository = new SaleRepositoryImpl();
const saleUseCase = new SaleUseCase(saleRepository);
const saleController = new SaleController(saleUseCase);

const saleRoute = Router();

saleRoute.get("/sales/hot", saleController.getMostSales.bind(saleController));
saleRoute.get(
  "/sales/user/:id",
  saleController.getSalesByUserId.bind(saleController)
);
saleRoute.delete("/sales/:id", saleController.deleteSale.bind(saleController));
saleRoute.post("/sales/", saleController.addSale.bind(saleController));
saleRoute.get("/sales/", saleController.getSales.bind(saleController));

export { saleRoute };
