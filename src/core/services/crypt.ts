import * as bcrypt from 'bcryptjs';

export class Crypt {
  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static compare(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
