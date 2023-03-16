import { Drop } from "../../domain/models/Drop";
import { DropRepository } from "./../../domain/repositories/DropRepository";

export class DropUseCase {
  constructor(private readonly dropRepository: DropRepository) {}

  async addDrop(drop: Drop): Promise<void> {
    if (!drop) throw new Error("Não foi possível criar o drop.");

    await this.dropRepository.addDrop(drop);
  }

  async updateDrop(drop: Drop, id: string): Promise<void> {
    if (!drop || !id) throw new Error("Não foi possível atualizar o drop.");

    await this.dropRepository.updateDrop(drop, id);
  }

  async deleteDrop(id: string): Promise<void> {
    if (!id) throw new Error("Não foi possível deletar o drop.");

    await this.dropRepository.deleteDrop(id);
  }

  async getDrops(): Promise<Drop[]> {
    const drops = await this.dropRepository.getDrops();

    return drops;
  }

  async getDropById(id: string): Promise<Drop | null> {
    if (!id) throw new Error("Não foi possível deletar o drop.");

    const drop = await this.dropRepository.getDropById(id);

    return drop;
  }
}
