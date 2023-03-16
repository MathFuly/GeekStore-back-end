import { staffRoute } from "./staffRoute";
import { Router } from "express";
import { CategoryController } from "../controller/CategoryController";
import { CategoryRepositoryImpl } from "../repositories/CategoryRepositoryImpl";
import { CategoryUseCase } from "../usecases/CategoryUseCase";
import { makeStaffLog } from "../../helpers/make-staff-log";

export const categoryRoute = Router();

const categoryRepository = new CategoryRepositoryImpl();
const categoryUseCase = new CategoryUseCase(categoryRepository);
const categoryControlller = new CategoryController(categoryUseCase);

staffRoute.post(
  "/categories/:id",
  makeStaffLog,
  categoryControlller.updateCategory.bind(categoryControlller)
);
staffRoute.delete(
  "/categories/:id",
  makeStaffLog,
  categoryControlller.deleteCategory.bind(categoryControlller)
);
staffRoute.get(
  "/categories/:id",
  categoryControlller.getCategoryById.bind(categoryControlller)
);
staffRoute.post(
  "/categories",
  makeStaffLog,
  categoryControlller.addCategory.bind(categoryControlller)
);

staffRoute.get(
  "/categories",
  categoryControlller.getCategories.bind(categoryControlller)
);
