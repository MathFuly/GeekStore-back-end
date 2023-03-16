import { Product } from "./../../domain/models/Product";
import { prisma } from "./../../database/prismaClient";
import { Sale } from "../../domain/models/Sale";
import { SaleRepository } from "../../domain/repositories/SaleRepository";
import { v4 } from "uuid";

export class SaleRepositoryImpl implements SaleRepository {
  async addSale(sales: Sale[]): Promise<void> {
    for (const sale of sales) {
      const targeInvetory = await prisma.inventory.findFirst({
        where: { productid: sale.productid, size: sale.size },
      });
      if (!targeInvetory?.current_inventory)
        throw new Error("Impossível completar a ação");

      const newQuantity = targeInvetory?.current_inventory - sale.quantity;

      if (newQuantity < 0)
        throw new Error(
          "Um ou mais produtos tem menos quantidade do que requerido"
        );

      await prisma.inventory.update({
        where: { id: targeInvetory?.id },
        data: { current_inventory: newQuantity },
      });
    }

    const code = v4();
    const dataAtual = new Date();
    const milissegundos = dataAtual.getTime();

    await prisma.sale.createMany({
      data: sales.map((sale) => ({
        code: `${milissegundos}${code}`,
        price: sale.price,
        quantity: sale.quantity,
        size: sale.size,
        discount: sale.discount,
        productid: sale.productid,
        userid: sale.userid,
        deliverydate: sale.deliverydate,
        deliveryprice: sale.deliveryprice,
      })),
    });

    await prisma.kart.deleteMany({
      where: { userid: sales[0].userid },
    });
  }

  async deleteSale(id: number): Promise<void> {
    await prisma.sale.delete({ where: { id } });
  }

  async getSales(): Promise<Sale[] | null> {
    return prisma.sale.findMany();
  }

  async getSalesByUserId(id: number): Promise<Sale[] | null> {
    const data = prisma.sale.findMany({
      where: { userid: id },
      include: {
        product: {
          include: {
            ProductCategory: {
              include: {
                category: {
                  include: {
                    theme: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return data;
  }

  async getMostSales(): Promise<Product[] | null> {
    const data = await prisma.product.findMany({
      orderBy: {
        Sale: {
          _count: "desc",
        },
      },
      include: {
        inventory: true,
        ProductCategory: {
          select: {
            category: { include: { theme: true } },
            categoryid: false,
            productid: false,
          },
        },
      },

      take: 6,
    });

    return data;
  }
}
