import { sign, verify } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { User } from "../../modules/user/domain/roots/user";
import { Parameters } from "../parameters/parameters";

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export class Tokens {
  static generateAccessToken(user: User, enable2FA: boolean = false) {
    const { userId, name, lastname, roles } = user.properties;

    const payload = {
      userId,
      name,
      lastname,
      roles,
      enable2FA,
    };

    return sign(payload, Parameters.jwtSecret, {
      expiresIn: Parameters.jwtExpiresIn,
    });
  }

  static generateRefreshToken() {
    return uuidv4();
  }

  static generateTokens(user: User, enable2FA: boolean = false): ITokens {
    return {
      accessToken: this.generateAccessToken(user, enable2FA),
      refreshToken: user.properties.refreshToken,
    };
  }

  static verifyToken(token: string) {
    return new Promise((resolve, reject) => {
      verify(token, Parameters.jwtSecret, (err, payload) => {
        if (err) return reject(err);
        return resolve(payload);
      });
    });
  }
}
