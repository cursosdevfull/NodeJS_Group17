import { IsNull } from "typeorm";

import { DatabaseBootstrap } from "../../../bootstrap/database.bootstrap";
import { Logger } from "../../../core/utils/logger";
import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/roots/user";
import { UserDto } from "./dtos/user.dto";
import { UserEntity } from "./entities/user.entity";

export class UserInfrastructure implements UserRepository {
  private readonly logger = Logger.createLogger();

  async save(user: User): Promise<User> {
    try {
      const repository =
        DatabaseBootstrap.getDataSource().getRepository(UserEntity);
      const entity = UserDto.fromDomainToData(user) as UserEntity;
      await repository.save(entity);

      return user;
    } catch (error) {
      this.logger.logError("Error saving user", error);
      throw new Error("Error saving user");
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const repository =
        DatabaseBootstrap.getDataSource().getRepository(UserEntity);

      const usersEntity = await repository.find({
        where: { deletedAt: IsNull() },
      });

      return UserDto.fromDataToDomain(usersEntity) as User[];
    } catch (error) {
      this.logger.logError("Error getAll user", error);
      throw new Error("Error getAll user");
    }
  }

  async getById(userId: string): Promise<User> {
    try {
      const repository =
        DatabaseBootstrap.getDataSource().getRepository(UserEntity);

      const userEntity = await repository.findOne({
        where: { deletedAt: IsNull(), userId },
      });

      return UserDto.fromDataToDomain(userEntity) as User;
    } catch (error) {
      this.logger.logError("Error getById user", error);
      throw new Error("Error getById user");
    }
  }

  async getByEmail(email: string): Promise<User> {
    try {
      const repository =
        DatabaseBootstrap.getDataSource().getRepository(UserEntity);

      const userEntity = await repository.findOne({
        where: { deletedAt: IsNull(), email },
      });

      return UserDto.fromDataToDomain(userEntity) as User;
    } catch (error) {
      this.logger.logError("Error getByEmail user", error);
      throw new Error("Error getByEmail user");
    }
  }

  async getByRefreshToken(refreshToken: string): Promise<User> {
    try {
      const repository =
        DatabaseBootstrap.getDataSource().getRepository(UserEntity);

      const userEntity = await repository.findOne({
        where: { deletedAt: IsNull(), refreshToken },
      });

      return UserDto.fromDataToDomain(userEntity) as User;
    } catch (error) {
      this.logger.logError("Error getByRefreshToken user", error);
      throw new Error("Error getByRefreshToken user");
    }
  }

  async getByPage(page: number, limit: number): Promise<User[]> {
    try {
      const repository =
        DatabaseBootstrap.getDataSource().getRepository(UserEntity);

      const [usersEntity, total] = await repository.findAndCount({
        where: { deletedAt: IsNull() },
        skip: page * limit,
        take: limit,
      });

      return UserDto.fromDataToDomain(usersEntity) as User[];
    } catch (error) {
      this.logger.logError("Error getByPage user", error);
      throw new Error("Error getByPage user");
    }
  }
}
