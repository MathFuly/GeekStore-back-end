import { themeRoute } from "./../routes/themeRoute";
import { prisma } from "../../database/prismaClient";
import { Kart } from "../../domain/models/Kart";
import { KartRepository } from "./../../domain/repositories/KartRepository";

export class KartRepositoryImpl implements KartRepository {
  async addKart(kart: Kart): Promise<void> {
    if (!kart.userid || !kart.productid) {
      throw new Error("O Usuáro e o Produto são obrigatorios");
    }

    const checkKart = await prisma.kart.findFirst({
      where: {
        productid: kart.productid,
        userid: kart.userid,
        quantity: kart.quantity,
        price: Number(kart.price),
        discount: Number(kart.discount),
        size: kart.size,
      },
    });

    if (checkKart) throw new Error("Esse produto já está no carrinho!");

    await prisma.kart.create({
      data: {
        productid: kart.productid,
        userid: kart.userid,
        quantity: kart.quantity,
        price: Number(kart.price),
        discount: Number(kart.discount),
        size: kart.size,
      },
    });
  }

  async incrementKart(id: string, quantity: number): Promise<void> {
    await prisma.kart.update({
      where: { id: parseInt(id) },
      data: { quantity },
    });
  }

  async decrementKart(id: string, quantity: number): Promise<void> {
    await prisma.kart.update({
      where: { id: parseInt(id) },
      data: { quantity },
    });
  }

  async deleteKart(id: string): Promise<void> {
    await prisma.kart.delete({
      where: { id: parseInt(id) },
    });
  }

  async getKartsByUser(id: string): Promise<Kart[] | null> {
    const data = await prisma.kart.findMany({
      where: { userid: parseInt(id) },
      include: {
        product: {
          include: {
            inventory: true,
            ProductCategory: {
              select: { category: { include: { theme: true } } },
            },
          },
        },
      },
      orderBy: { created_at: "desc" },
    });

    return data;
  }
}
