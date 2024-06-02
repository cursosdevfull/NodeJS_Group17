import { Crypt } from '../../../core/services/crypt';
import { Tokens } from '../../../core/services/tokens';
import { UserRepository } from '../../user/domain/repositories/user.repository';
import { Auth } from '../domain/auth';

export class AuthApplication {
  constructor(private readonly userRepository: UserRepository) {}

  async login(auth: Auth) {
    const userFound = await this.userRepository.getByEmail(
      auth.properties.email
    );

    if (!userFound) {
      throw new Error("User not found");
    }

    const matchPassword = Crypt.compare(
      auth.properties.password,
      userFound.properties.password
    );

    if (!matchPassword) {
      throw new Error("Invalid password");
    }

    return Tokens.generateTokens(userFound);
  }

  async getNewAccessToken(refreshToken: string) {
    const userFound = await this.userRepository.getByRefreshToken(refreshToken);

    if (!userFound) {
      throw new Error("User not found");
    }

    userFound.update({ refreshToken: Tokens.generateRefreshToken() });

    await this.userRepository.save(userFound);

    return Tokens.generateTokens(userFound);
  }
}
