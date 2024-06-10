import {
  ResultGetAll,
  ResultGetByEmail,
  ResultGetById,
  ResultGetByPage,
  ResultGetByRefreshToken,
  ResultSave,
} from "../../infrastructure/user.infrastructure";
import { User } from "../roots/user";

export interface UserRepository {
  save(user: User): Promise<ResultSave>;
  getAll(): Promise<ResultGetAll>;
  getById(userId: string): Promise<ResultGetById>;
  getByEmail(email: string): Promise<ResultGetByEmail>;
  getByRefreshToken(refreshToken: string): Promise<ResultGetByRefreshToken>;
  getByPage(page: number, limit: number): Promise<ResultGetByPage>;
}
