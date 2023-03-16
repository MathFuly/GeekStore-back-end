import { prisma } from "../../database/prismaClient";
import { Theme } from "../../domain/models/Theme";
import { ThemeRepository } from "./../../domain/repositories/ThemeRepository";

export class ThemeRepositoryImpl implements ThemeRepository {
  async addTheme(theme: Theme): Promise<void> {
    if (!theme.dropcode || !theme.categoryid) {
      throw new Error("O Drop e a Categoria são obrigatorios");
    }

    await prisma.theme.create({
      data: {
        dropcode: theme.dropcode,
        categoryid: theme.categoryid,
        logo: theme.logo,
        perfil: theme.perfil,
        pagebanner: theme.pagebanner,
        slidebanner: theme.slidebanner,
      },
    });
  }

  async updateTheme(theme: Theme, id: string): Promise<void> {
    await prisma.theme.update({
      where: { id: parseInt(id) },
      data: {
        logo: theme.logo,
        perfil: theme.perfil,
        pagebanner: theme.pagebanner,
        slidebanner: theme.slidebanner,
      },
    });
  }

  async deleteTheme(id: string): Promise<void> {
    await prisma.theme.delete({
      where: { id: parseInt(id) },
    });
  }

  async getThemes(): Promise<Theme[]> {
    const themes = await prisma.theme.findMany();
    return themes;
  }

  async getThemeById(id: string): Promise<Theme | null> {
    const theme = await prisma.theme.findUnique({
      where: { id: parseInt(id) },
    });

    return theme;
  }

  async getThemesByCode(dropcode: string): Promise<Theme[]> {
    const themes = await prisma.theme.findMany({
      where: { dropcode: dropcode },
      include: { category: true },
    });

    return themes;
  }
}
