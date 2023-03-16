import { Kart } from "../models/Kart";

export interface KartRepository {
  addKart(kart: Kart): Promise<void>;
  incrementKart(id: string, quantity: number): Promise<void>;
  decrementKart(id: string, quantity: number): Promise<void>;
  deleteKart(id: string): Promise<void>;
  getKartsByUser(id: string): Promise<Kart[] | null>;
}
