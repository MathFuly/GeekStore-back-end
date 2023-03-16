export interface Staff {
  id?: number;
  name: string;
  lastname: string;
  cpf: string;
  image?: string | null;
  password?: string;
  role: string;
  created_at?: Date | null;
  last_login?: Date | null;
  last_logout?: Date | null;
}
