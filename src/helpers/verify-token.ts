import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: "Acesso Negado!",
    });
  }

  try {
    const checked = jwt.verify(authorization, "nossosecret");

    if (checked) {
      next();
    } else throw new Error();
  } catch (error) {
    return res.status(400).json({
      message: "Token Inválido!",
    });
  }
}
