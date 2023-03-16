import * as jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import { prisma } from "../database/prismaClient";

export async function getStaffRoleByToken(res: Response, token?: string) {
  if (!token) {
    return res.status(401).json("Acesso Negado!");
  }

  const decoded = jwt.verify(token, "nossosecret") as JwtPayload;

  const staff = await prisma.staff.findUnique({
    where: {
      cpf: decoded.cpf,
    },
  });

  return staff?.role;
}
