import { Response } from "express";
import { prisma } from "../../database/prismaClient";
import { StaffAuth } from "../../domain/models/Auth";
import { Staff } from "../../domain/models/Staff";
import bcrypt from "bcrypt";
import { encryptPassword } from "../../util/encryptPassword";
import { StaffRepository } from "./../../domain/repositories/StaffRepository";

export class StaffRepositoryImpl implements StaffRepository {
  async addStaff(staff: Staff): Promise<string> {
    const createdStaff = await prisma.staff.create({
      data: {
        name: staff.name,
        lastname: staff.lastname,
        cpf: staff.cpf,
        password: staff.password || (await encryptPassword("123")),
        image: staff.image,
        role: staff.role,
      },
    });

    return createdStaff.name;
  }

  async updateStaff(staff: Staff, id: string): Promise<void> {
    await prisma.staff.update({
      where: { id: parseInt(id) },
      data: {
        name: staff.name,
        lastname: staff.lastname,
        cpf: staff.cpf,
        image: staff.image,
        role: staff.role,
      },
    });
  }

  async deleteStaff(id: string): Promise<void> {
    await prisma.staff.delete({
      where: { id: parseInt(id) },
    });
  }

  async getStaff(): Promise<Staff[]> {
    const staff = await prisma.staff.findMany({
      select: {
        password: false,
        id: true,
        name: true,
        lastname: true,
        cpf: true,
        role: true,
        image: true,
        created_at: true,
        last_login: true,
        last_logout: true,
      },
    });

    return staff;
  }

  async getStaffById(id: string): Promise<Staff | null> {
    const staff = await prisma.staff.findUnique({
      where: { id: parseInt(id) },
      select: {
        password: false,
        id: true,
        name: true,
        lastname: true,
        cpf: true,
        role: true,
        image: true,
        created_at: true,
        last_login: true,
        last_logout: true,
      },
    });

    return staff;
  }

  async loginStaff(cpf: string, password: string): Promise<StaffAuth | null> {
    const staff = await prisma.staff.findUnique({
      where: { cpf: cpf },
      select: {
        cpf: true,
        name: true,
        image: true,
        role: true,
        password: true,
      },
    });

    if (!staff) throw new Error("O usuário não existe!");

    const checkPassword = await bcrypt.compare(password, staff?.password);

    if (!checkPassword) throw new Error("CPF ou senha inválida!");

    const data = {
      cpf: staff.cpf,
      name: staff.name,
      image: staff.image,
      role: staff.role,
    };

    return data;
  }
}
