import { User } from "../../domain/roots/user";
import { UserFactory } from "../../domain/roots/user.factory";
import { UserEntity } from "../entities/user.entity";

export class UserDto {
  static fromDomainToData(data: User | User[]): UserEntity | UserEntity[] {
    if (Array.isArray(data)) {
      return data.map((item) => UserDto.fromDomainToData(item)) as UserEntity[];
    }

    const userEntity = new UserEntity();
    userEntity.userId = data.properties.userId;
    userEntity.email = data.properties.email;
    userEntity.name = data.properties.name;
    userEntity.lastname = data.properties.lastname;
    userEntity.password = data.properties.password;
    userEntity.refreshToken = data.properties.refreshToken;
    userEntity.createdAt = data.properties.createdAt;
    userEntity.updatedAt = data.properties.updatedAt;
    userEntity.deletedAt = data.properties.deletedAt;
    userEntity.secret = data.properties.secret;
    userEntity.image = data.properties.image;

    return userEntity;
  }

  static fromDataToDomain(data: UserEntity | UserEntity[]): User | User[] {
    if (Array.isArray(data)) {
      return data.map((item) => UserDto.fromDataToDomain(item)) as User[];
    }

    return UserFactory.create({
      userId: data.userId,
      email: data.email,
      name: data.name,
      lastname: data.lastname,
      password: data.password,
      refreshToken: data.refreshToken,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      secret: data.secret,
      image: data.image,
      roles: ["admin"],
    });
  }
}
