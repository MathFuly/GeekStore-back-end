import { Theme } from "../models/Theme";

export interface ThemeRepository {
  addTheme(theme: Theme): Promise<void>;
  updateTheme(theme: Theme, id: string): Promise<void>;
  deleteTheme(id: string): Promise<void>;
  getThemes(): Promise<Theme[]>;
  getThemesByCode(id: string | number): Promise<Theme[]>;
  getThemeById(id: string): Promise<Theme | null>;
}
