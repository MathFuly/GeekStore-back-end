import { StaffAuth } from "./../models/Auth";
import { Staff } from "./../models/Staff";

export interface StaffRepository {
  addStaff(staff: Staff): Promise<string>;
  updateStaff(staff: Staff, id: string): Promise<void>;
  deleteStaff(id: string): Promise<void>;
  getStaff(): Promise<Staff[]>;
  getStaffById(id: string): Promise<Staff | null>;
  loginStaff(cpf: string, password: string): Promise<StaffAuth | null>;
}
