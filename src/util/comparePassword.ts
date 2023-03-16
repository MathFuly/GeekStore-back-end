import bcrypt from "bcrypt";

export async function comparePassword(
  plain: string,
  hashed: string | undefined
) {
  if (!hashed) return false;

  bcrypt.compare(plain, hashed, function (err, res) {
    if (!res) {
      return false;
    }
  });

  return true;
}
