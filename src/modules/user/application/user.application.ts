import { err, ok, Result } from "neverthrow";

import {
  BaseException,
  NotFoundException,
} from "../../../core/handle-errors/responses/exception";
import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/roots/user";
import { UserResponse, UserResponseDto } from "./dtos/user-response.dto";

export type ResultSaveApplication = Result<UserResponse, BaseException>;
export type ResultGetAllApplication = Result<UserResponse[], BaseException>;
export type ResultGetById = Result<User | null, BaseException>;
export type ResultGetByEmail = Result<UserResponse | null, BaseException>;
export type ResultGetByRefreshToken = Result<
  UserResponse | null,
  BaseException
>;
export type ResultGetByPage = Result<UserResponse[], BaseException>;

export class UserApplication {
  constructor(private readonly repository: UserRepository) {}

  async save(user: User): Promise<ResultSaveApplication> {
    const userResult = await this.repository.save(user);

    if (userResult.isErr()) {
      return err(userResult.error);
    }
    const userValue = userResult.value;
    return ok(UserResponseDto.transform(userValue) as UserResponse);
  }

  async getAll(): Promise<ResultGetAllApplication> {
    const result = await this.repository.getAll();
    if (result.isErr()) {
      return err(result.error);
    }

    const users = result.value;
    return ok(UserResponseDto.transform(users) as UserResponse[]);
  }

  async getById(userId: string): Promise<ResultGetById> {
    const result = await this.repository.getById(userId);

    if (result.isErr()) {
      return err(result.error);
    }

    const user = result.value;

    if (!user) {
      return err(
        new NotFoundException({
          message: "User not found",
          name: "User not found",
        })
      );
    }

    return ok(user);
  }

  async getByEmail(email: string): Promise<ResultGetByEmail> {
    const result = await this.repository.getByEmail(email);

    if (result.isErr()) {
      return err(result.error);
    }

    const user = result.value;

    if (!user) {
      return err(
        new NotFoundException({
          message: "User not found",
          name: "User not found",
        })
      );
    }

    return ok(UserResponseDto.transform(user) as UserResponse);
  }

  async getByRefreshToken(
    refreshToken: string
  ): Promise<ResultGetByRefreshToken> {
    const result = await this.repository.getByRefreshToken(refreshToken);

    if (result.isErr()) {
      return err(result.error);
    }

    const user = result.value;
    return ok(UserResponseDto.transform(user) as UserResponse);
  }

  async getByPage(page: number, limit: number): Promise<ResultGetByPage> {
    const result = await this.repository.getByPage(page, limit);

    if (result.isErr()) {
      return err(result.error);
    }

    const users = result.value;
    return ok(UserResponseDto.transform(users) as UserResponse[]);
  }
}
