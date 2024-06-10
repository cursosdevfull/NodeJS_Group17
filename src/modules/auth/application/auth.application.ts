import { err, ok, Result } from "neverthrow";

import {
  BadRequestException,
  BaseException,
  NotFoundException,
} from "../../../core/handle-errors/responses/exception";
import { Crypt } from "../../../core/services/crypt";
import { ITokens, Tokens } from "../../../core/services/tokens";
import { UserRepository } from "../../user/domain/repositories/user.repository";
import { Auth } from "../domain/auth";

export type ResultLogin = Result<ITokens, BaseException>;
export type ResultGetRefreshToken = Result<ITokens, BaseException>;

export class AuthApplication {
  constructor(private readonly userRepository: UserRepository) {}

  async login(auth: Auth): Promise<ResultLogin> {
    const userFoundResult = await this.userRepository.getByEmail(
      auth.properties.email
    );

    if (userFoundResult.isErr()) {
      return err(userFoundResult.error);
    }

    const userFound = userFoundResult.value;

    if (!userFound) {
      return err(
        new NotFoundException({
          message: "User not found",
          name: "User not found",
        })
      );
    }

    const matchPassword = Crypt.compare(
      auth.properties.password,
      userFound.properties.password
    );

    if (!matchPassword) {
      return err(
        new BadRequestException({
          message: "Invalid password",
          name: "Invalid password",
        })
      );
    }

    return ok(Tokens.generateTokens(userFound));
  }

  async getNewAccessToken(
    refreshToken: string
  ): Promise<ResultGetRefreshToken> {
    const userFoundResult = await this.userRepository.getByRefreshToken(
      refreshToken
    );

    if (userFoundResult.isErr()) {
      return err(userFoundResult.error);
    }

    const userFound = userFoundResult.value;

    if (!userFound) {
      return err(
        new NotFoundException({
          message: "User not found",
          name: "User not found",
        })
      );
    }

    userFound.update({ refreshToken: Tokens.generateRefreshToken() });

    const result = await this.userRepository.save(userFound);
    if (result.isErr()) {
      return err(result.error);
    }

    return ok(Tokens.generateTokens(userFound));
  }
}
