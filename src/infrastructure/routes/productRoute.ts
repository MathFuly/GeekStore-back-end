import { ProductController } from "./../controller/ProductController";
import { ProductUseCase } from "./../usecases/ProductUseCase";
import { ProductRepositoryImpl } from "./../repositories/ProductRepositoryImpl";
import { Router } from "express";
import { makeStaffLog } from "../../helpers/make-staff-log";

export const productRoute = Router();

const productRepository = new ProductRepositoryImpl();
const productUseCase = new ProductUseCase(productRepository);
const productController = new ProductController(productUseCase);

productRoute.get(
  "/products/search/:search",
  productController.getProductsBySearch.bind(productController)
);
productRoute.get(
  "/products/type/:type",
  productController.getProductByType.bind(productController)
);
productRoute.get(
  "/products/category/:id",
  productController.getProductsByCategory.bind(productController)
);
productRoute.post(
  "/products/:id",
  makeStaffLog,
  productController.updateProduct.bind(productController)
);
productRoute.delete(
  "/products/:id",
  makeStaffLog,
  productController.deleteProduct.bind(productController)
);
productRoute.get(
  "/products/:id",
  productController.getProductById.bind(productController)
);
productRoute.post(
  "/products",
  makeStaffLog,
  productController.addProduct.bind(productController)
);
productRoute.get(
  "/products",
  productController.getProducts.bind(productController)
);
