export interface StaffAuth {
  cpf: string;
  image: string | null;
  name: string;
  role: string;
  password?: string;
}

export interface UserAuth {
  id: number;
  email: string;
  image: string | null;
  name: string;
  token?: string;
}
