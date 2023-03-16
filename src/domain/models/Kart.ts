import { Decimal } from "@prisma/client/runtime";
import { Product } from "./Product";
import { User } from "./User";

export interface Kart {
  id?: number;
  user?: User;
  userid?: number;
  product?: Product;
  productid?: number;
  quantity: number;
  size: string;
  discount?: number | null;
  price: number;
  created_at?: Date;
}
