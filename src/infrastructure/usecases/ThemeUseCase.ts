import { Theme } from "../../domain/models/Theme";
import { ThemeRepository } from "./../../domain/repositories/ThemeRepository";

export class ThemeUseCase {
  constructor(private readonly themeRepository: ThemeRepository) {}

  async addTheme(theme: Theme): Promise<void> {
    if (!theme) throw new Error("Não foi possível criar o tema.");

    await this.themeRepository.addTheme(theme);
  }

  async updateTheme(theme: Theme, id: string): Promise<void> {
    if (!theme || !id) throw new Error("Não foi possível atualizar o tema.");

    await this.themeRepository.updateTheme(theme, id);
  }

  async deleteTheme(id: string): Promise<void> {
    if (!id) throw new Error("Não foi possível deletar o tema.");

    await this.themeRepository.deleteTheme(id);
  }

  async getThemes(): Promise<Theme[]> {
    const theme = await this.themeRepository.getThemes();

    return theme;
  }

  async getThemeById(id: string): Promise<Theme | null> {
    if (!id) throw new Error("Não foi possível achar o tema.");

    const theme = await this.themeRepository.getThemeById(id);

    return theme;
  }

  async getThemesByCode(dropcode: string): Promise<Theme[]> {
    if (!dropcode) throw new Error("Não foi possível achar o tema.");

    const themes = await this.themeRepository.getThemesByCode(dropcode);

    return themes;
  }
}
