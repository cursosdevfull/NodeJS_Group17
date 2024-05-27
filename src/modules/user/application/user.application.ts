import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/roots/user";
import { UserResponseDto } from "./dtos/user-response.dto";

export class UserApplication {
  constructor(private readonly repository: UserRepository) {}

  async save(user: User) {
    const password = user.properties.password;

    return UserResponseDto.transform(await this.repository.save(user));
  }

  async getAll() {
    return UserResponseDto.transform(await this.repository.getAll());
  }

  async getById(userId: string) {
    return await this.repository.getById(userId);
  }

  async getByEmail(email: string) {
    return UserResponseDto.transform(await this.repository.getByEmail(email));
  }

  async getByRefreshToken(refreshToken: string) {
    return UserResponseDto.transform(
      await this.repository.getByRefreshToken(refreshToken)
    );
  }

  async getByPage(page: number, limit: number) {
    return UserResponseDto.transform(
      await this.repository.getByPage(page, limit)
    );
  }
}
