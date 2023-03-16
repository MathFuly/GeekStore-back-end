import * as jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { prisma } from "../database/prismaClient";
import { NextFunction, Request, Response } from "express";

export async function makeStaffLog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        message: "Acesso Negado!",
      });
    }

    const decoded = jwt.verify(authorization, "nossosecret") as JwtPayload;

    const date = new Date();

    await prisma.staff.update({
      where: { cpf: decoded.cpf },
      data: {
        last_logout: date,
      },
    });

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Não foi possível executar a ação.",
    });
  }
}
