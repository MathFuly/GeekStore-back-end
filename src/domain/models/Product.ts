import { Drop } from "./Drop";
import { Inventory } from "./Inventory";

export interface Product {
  id?: number;
  title: string;
  image: string;
  desc: string;
  type: string;
  dropcode: string;
  drop?: Drop;
  inventory?: Inventory[];
  categoryId?: number;
}
