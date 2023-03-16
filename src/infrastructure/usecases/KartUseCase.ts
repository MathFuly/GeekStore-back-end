import { checkKartExist } from "../../util/checkKartExist";
import { Kart } from "./../../domain/models/Kart";
import { KartRepository } from "./../../domain/repositories/KartRepository";

export class KartUseCase {
  constructor(private readonly kartRepository: KartRepository) {}

  async addKart(kart: Kart): Promise<void> {
    if (!kart) throw new Error("Não foi possível criar o carrinho.");

    await this.kartRepository.addKart(kart);
  }

  async incrementKart(id: string): Promise<void> {
    const checkKart = await checkKartExist(id);

    if (!checkKart) throw new Error("Não foi possível encontrar o carrinho.");

    const newQuantity = checkKart.quantity + 1;

    await this.kartRepository.incrementKart(id, newQuantity);
  }

  async decrementKart(id: string): Promise<void> {
    const checkKart = await checkKartExist(id);

    if (!checkKart) throw new Error("Não foi possível encontrar o carrinho.");

    const newQuantity = checkKart.quantity - 1;

    if (newQuantity == 0) {
      await this.kartRepository.deleteKart(id);
    } else {
      await this.kartRepository.decrementKart(id, newQuantity);
    }
  }

  async deleteKart(id: string): Promise<void> {
    if (!id) throw new Error("Não foi possível encontrar o carrinho.");

    await this.kartRepository.deleteKart(id);
  }

  async getKartsByUser(id: string): Promise<Kart[] | null> {
    if (!id) throw new Error("Não foi possível encontrar o carrinho.");

    const data = await this.kartRepository.getKartsByUser(id);

    return data;
  }
}
