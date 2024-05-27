import { User } from "../roots/user";

export interface UserRepository {
  save(user: User): Promise<User>;
  getAll(): Promise<User[]>;
  getById(userId: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  getByRefreshToken(refreshToken: string): Promise<User | null>;
  getByPage(page: number, limit: number): Promise<User[]>;
}
