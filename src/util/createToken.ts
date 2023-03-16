import { UserAuth } from "./../domain/models/Auth";
import { StaffAuth } from "../domain/models/Auth";
import jwt from "jsonwebtoken";

export async function createStaffToken(auth: StaffAuth | null) {
  const token = jwt.sign(
    {
      cpf: auth?.cpf,
      name: auth?.name,
    },
    "nossosecret"
  );

  const data = {
    token,
    cpf: auth?.cpf,
    name: auth?.name,
    role: auth?.role,
    image: auth?.image,
  };

  return data;
}

export async function createUserToken(auth: UserAuth | null) {
  const token = jwt.sign(
    {
      email: auth?.email,
      name: auth?.name,
    },
    "nossosecret"
  );

  const data = {
    token,
    id: auth?.id,
    email: auth?.email,
    name: auth?.name,
    image: auth?.image,
  };

  return data;
}
