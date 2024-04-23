import { User } from "./user";

export interface UserRepository {
  insert(user: User): Promise<User>;
  getAll(): Promise<User[]>;
  findUserByEmail(email: string): Promise<boolean>;
}
