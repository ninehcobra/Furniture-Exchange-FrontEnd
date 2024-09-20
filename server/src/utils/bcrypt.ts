import * as bcrypt from 'bcrypt';
import { SALT_OR_ROUNDS } from 'src/environments';

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_OR_ROUNDS);
};

export const comparePasswords = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
