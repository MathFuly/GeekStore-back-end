import { prisma } from "./../database/prismaClient";

export async function checkKartExist(id: string) {
  const data = await prisma.kart.findUnique({
    where: { id: parseInt(id) },
  });

  return data;
}
