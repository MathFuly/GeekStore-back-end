import { prisma } from "./../../database/prismaClient";
import { Drop } from "../../domain/models/Drop";
import { DropRepository } from "../../domain/repositories/DropRepository";

export class DropRepositoryImpl implements DropRepository {
  async addDrop(drop: Drop): Promise<void> {
    await prisma.drop.create({
      data: {
        code: drop.code,
      },
    });
  }

  async updateDrop(drop: Drop, id: string): Promise<void> {
    await prisma.drop.update({
      where: { id: parseInt(id) },
      data: {
        code: drop.code,
      },
    });
  }

  async deleteDrop(id: string): Promise<void> {
    await prisma.drop.delete({
      where: { id: parseInt(id) },
    });
  }

  async getDrops(): Promise<Drop[]> {
    const drops = await prisma.drop.findMany({
      include: {
        theme: {
          include: { category: true },
        },
      },
      orderBy: {
        code: "desc",
      },
    });

    return drops;
  }

  async getDropById(id: string): Promise<Drop | null> {
    const drop = await prisma.drop.findUnique({
      where: { id: parseInt(id) },
    });

    return drop;
  }
}
