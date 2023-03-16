import { StaffController } from "./../controller/StaffController";
import { StaffUseCase } from "./../usecases/StaffUseCase";
import { Router } from "express";
import { StaffRepositoryImpl } from "../repositories/StaffRepositoryImpl";
import { makeStaffLog } from "../../helpers/make-staff-log";

export const staffRoute = Router();

const staffRepository = new StaffRepositoryImpl();
const staffUseCase = new StaffUseCase(staffRepository);
const staffControlller = new StaffController(staffUseCase);

staffRoute.post(
  "/staff/login",
  staffControlller.loginStaff.bind(staffControlller)
);
staffRoute.get(
  "/staff/:id",
  makeStaffLog,
  staffControlller.getStaffById.bind(staffControlller)
);
staffRoute.post(
  "/staff/:id",
  makeStaffLog,
  staffControlller.updateStaff.bind(staffControlller)
);
staffRoute.delete(
  "/staff/:id",
  makeStaffLog,
  staffControlller.deleteStaff.bind(staffControlller)
);
staffRoute.post(
  "/staff",
  makeStaffLog,
  staffControlller.addStaff.bind(staffControlller)
);
staffRoute.get(
  "/staff",
  makeStaffLog,
  staffControlller.getStaff.bind(staffControlller)
);
