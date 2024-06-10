import { err, ok, Result } from "neverthrow";
import * as qrcode from "qrcode";
import * as speakeasy from "speakeasy";

import {
  BaseException,
  UnauthorizedException,
} from "../handle-errors/responses/exception";

export type ResultVerify2FA = Result<boolean, BaseException>;

export class OneTimePassword {
  static async generateQRAndSecret() {
    const secret = speakeasy.generateSecret();
    const qr = await qrcode.toDataURL(secret.otpauth_url);

    return { secret: secret.base32, qr };
  }

  static verify2FA(secret: string, token: string): ResultVerify2FA {
    const verify = speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
    });

    if (verify) {
      return ok(true);
    } else {
      return err(
        new UnauthorizedException({
          message: "Unauthorized",
          name: "Unauthorized",
        })
      );
    }
  }
}
