import { Decimal } from "@prisma/client/runtime";

export interface Inventory {
  id?: number;
  size: string;
  initial_inventory: number;
  current_inventory: number | null;
  price: Decimal;
  discount: Decimal | null;
  productid?: number;
}
