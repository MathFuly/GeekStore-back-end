import bcrypt from "bcrypt";

export async function checkPassword(passwordInput: string, password: string) {
  const checkPassword = await bcrypt.compare(passwordInput, password);

  if (!checkPassword) throw new Error("CPF ou senha inválida!");

  return checkPassword;
}
