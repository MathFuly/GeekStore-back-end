import { Drop } from "../models/Drop";

export interface DropRepository {
  addDrop(drop: Drop): Promise<void>;
  updateDrop(drop: Drop, id: string): Promise<void>;
  deleteDrop(id: string): Promise<void>;
  getDrops(): Promise<Drop[]>;
  getDropById(id: string): Promise<Drop | null>;
}
