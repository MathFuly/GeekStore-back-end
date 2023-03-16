import { Decimal } from "@prisma/client/runtime";
import { Product } from "./Product";
import { User } from "./User";

export interface Sale {
  id?: number;
  code: string;
  product?: Product;
  productid: number;
  user?: User;
  userid: number;
  discount?: number | null;
  price: Decimal;
  size: string;
  quantity: number;
  deliverydate: Date;
  deliveryprice?: Decimal | null;
}
