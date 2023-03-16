import { StaffAuth } from "../../domain/models/Auth";
import { Staff } from "../../domain/models/Staff";
import { StaffRepository } from "./../../domain/repositories/StaffRepository";

export class StaffUseCase {
  constructor(private readonly staffRepository: StaffRepository) {}

  async addStaff(staff: Staff): Promise<string> {
    if (!staff) throw new Error("Não foi possível criar o usuário.");

    const createdStaff = await this.staffRepository.addStaff(staff);

    return createdStaff;
  }

  async updateStaff(staff: Staff, id: string): Promise<void> {
    if (!staff || !id) {
      throw new Error("Não foi possível atualizar o usuário.");
    }

    await this.staffRepository.updateStaff(staff, id);
  }

  async deleteStaff(id: string): Promise<void> {
    if (!id) {
      throw new Error("Não foi possível deletar o usuário.");
    }

    await this.staffRepository.deleteStaff(id);
  }

  async getStaff(): Promise<Staff[]> {
    const staff = await this.staffRepository.getStaff();

    return staff;
  }

  async getStaffById(id: string): Promise<Staff | null> {
    if (!id) {
      throw new Error("Não foi possível encontrar o usuário.");
    }

    const staff = await this.staffRepository.getStaffById(id);

    return staff;
  }

  async loginStaff(cpf: string, password: string): Promise<StaffAuth | null> {
    const auth = await this.staffRepository.loginStaff(cpf, password);

    return auth;
  }
}
