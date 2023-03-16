import { ThemeController } from "./../controller/ThemeController";
import { ThemeUseCase } from "./../usecases/ThemeUseCase";
import { ThemeRepositoryImpl } from "./../repositories/ThemeRepositoryImpl";
import { Router } from "express";
import { makeStaffLog } from "../../helpers/make-staff-log";

export const themeRoute = Router();

const themeRepository = new ThemeRepositoryImpl();
const themeUseCase = new ThemeUseCase(themeRepository);
const themeController = new ThemeController(themeUseCase);

themeRoute.get(
  "/themes/drop/:code",
  themeController.getThemesByCode.bind(themeController)
);
themeRoute.post(
  "/themes/:id",
  makeStaffLog,
  themeController.updateTheme.bind(themeController)
);
themeRoute.delete(
  "/themes/:id",
  makeStaffLog,
  themeController.deleteTheme.bind(themeController)
);
themeRoute.get(
  "/themes/:id",
  themeController.getThemeById.bind(themeController)
);
themeRoute.post(
  "/themes",
  makeStaffLog,
  themeController.addTheme.bind(themeController)
);
themeRoute.get("/themes", themeController.getThemes.bind(themeController));
