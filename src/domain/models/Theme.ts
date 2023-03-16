import { Drop } from "./Drop";
import { Category } from "./Category";

export interface Theme {
  id?: number;
  dropcode?: string;
  categoryid?: number;
  slidebanner: string;
  pagebanner: string;
  logo: string;
  perfil: string;
  category?: Category;
  drop?: Drop;
}
