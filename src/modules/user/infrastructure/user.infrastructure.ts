import { err, ok, Result } from "neverthrow";
import { IsNull } from "typeorm";

import { DatabaseBootstrap } from "../../../bootstrap/database.bootstrap";
import {
  BaseException,
  InternalServerErrorException,
  MESSAGE_STATUS,
} from "../../../core/handle-errors/responses/exception";
import { LogContext, Logger } from "../../../core/utils/logger";
import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/roots/user";
import { UserDto } from "./dtos/user.dto";
import { UserEntity } from "./entities/user.entity";

export type ResultSave = Result<User, BaseException>;
export type ResultGetAll = Result<User[], BaseException>;
export type ResultGetById = Result<User | null, BaseException>;
export type ResultGetByEmail = Result<User | null, BaseException>;
export type ResultGetByRefreshToken = Result<User | null, BaseException>;
export type ResultGetByPage = Result<User[], BaseException>;

export class UserInfrastructure implements UserRepository {
  private readonly logger = Logger.createLogger();

  async save(user: User): Promise<ResultSave> {
    try {
      const repository =
        DatabaseBootstrap.getDataSource().getRepository(UserEntity);
      const entity = UserDto.fromDomainToData(user) as UserEntity;
      const userSaved = await repository.save(entity);

      return ok(UserDto.fromDataToDomain(userSaved) as User);
    } catch (error: unknown) {
      this.logger.logError("Error saving user", error);
      return err(
        new InternalServerErrorException({
          message:
            (error as LogContext).sqlMessage ??
            MESSAGE_STATUS.INTERNAL_SERVER_ERROR,
          name: "ERROR DATABASE",
        })
      );
    }
  }

  async getAll(): Promise<ResultGetAll> {
    try {
      const repository =
        DatabaseBootstrap.getDataSource().getRepository(UserEntity);

      const usersEntity = await repository.find({
        where: { deletedAt: IsNull() },
        relations: ["roles"],
      });

      return ok(UserDto.fromDataToDomain(usersEntity) as User[]);
    } catch (error: unknown) {
      this.logger.logError("Error saving user", error);
      return err(
        new InternalServerErrorException({
          message:
            (error as LogContext).sqlMessage ??
            MESSAGE_STATUS.INTERNAL_SERVER_ERROR,
          name: "",
        })
      );
    }
  }

  async getById(userId: string): Promise<ResultGetById> {
    try {
      const repository =
        DatabaseBootstrap.getDataSource().getRepository(UserEntity);

      const userEntity = await repository.findOne({
        where: { deletedAt: IsNull(), userId },
        relations: ["roles"],
      });

      return ok(UserDto.fromDataToDomain(userEntity) as User);
    } catch (error: unknown) {
      this.logger.logError("Error saving user", error);
      return err(
        new InternalServerErrorException({
          message:
            (error as LogContext).sqlMessage ??
            MESSAGE_STATUS.INTERNAL_SERVER_ERROR,
          name: "",
        })
      );
    }
  }

  async getByEmail(email: string): Promise<ResultGetByEmail> {
    try {
      const repository =
        DatabaseBootstrap.getDataSource().getRepository(UserEntity);

      const userEntity = await repository.findOne({
        where: { deletedAt: IsNull(), email },
        relations: ["roles"],
      });

      return ok(UserDto.fromDataToDomain(userEntity) as User);
    } catch (error: unknown) {
      this.logger.logError("Error saving user", error);
      return err(
        new InternalServerErrorException({
          message:
            (error as LogContext).sqlMessage ??
            MESSAGE_STATUS.INTERNAL_SERVER_ERROR,
          name: "",
        })
      );
    }
  }

  async getByRefreshToken(
    refreshToken: string
  ): Promise<ResultGetByRefreshToken> {
    try {
      const repository =
        DatabaseBootstrap.getDataSource().getRepository(UserEntity);

      const userEntity = await repository.findOne({
        where: { deletedAt: IsNull(), refreshToken },
        relations: ["roles"],
      });

      return ok(UserDto.fromDataToDomain(userEntity) as User);
    } catch (error: unknown) {
      this.logger.logError("Error saving user", error);
      return err(
        new InternalServerErrorException({
          message:
            (error as LogContext).sqlMessage ??
            MESSAGE_STATUS.INTERNAL_SERVER_ERROR,
          name: "",
        })
      );
    }
  }

  async getByPage(page: number, limit: number): Promise<ResultGetByPage> {
    try {
      const repository =
        DatabaseBootstrap.getDataSource().getRepository(UserEntity);

      const [usersEntity, total] = await repository.findAndCount({
        where: { deletedAt: IsNull() },
        skip: page * limit,
        take: limit,
        relations: ["roles"],
      });

      return ok(UserDto.fromDataToDomain(usersEntity) as User[]);
    } catch (error: unknown) {
      this.logger.logError("Error saving user", error);
      return err(
        new InternalServerErrorException({
          message:
            (error as LogContext).sqlMessage ??
            MESSAGE_STATUS.INTERNAL_SERVER_ERROR,
          name: "",
        })
      );
    }
  }
}
