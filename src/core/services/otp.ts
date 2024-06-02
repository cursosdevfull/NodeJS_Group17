import * as qrcode from 'qrcode';
import * as speakeasy from 'speakeasy';

export class OneTimePassword {
  static async generateQRAndSecret() {
    const secret = speakeasy.generateSecret();
    const qr = await qrcode.toDataURL(secret.otpauth_url);

    return { secret: secret.base32, qr };
  }

  static verify2FA(secret: string, token: string) {
    return speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
    });
  }
}
