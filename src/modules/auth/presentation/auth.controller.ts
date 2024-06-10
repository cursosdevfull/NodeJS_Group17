import { NextFunction, Request, Response } from "express";

import { Crypt } from "../../../core/services/crypt";
import { OneTimePassword } from "../../../core/services/otp";
import { Tokens } from "../../../core/services/tokens";
import { UserApplication } from "../../user/application/user.application";
import { UserProperties } from "../../user/domain/roots/user";
import { UserFactory } from "../../user/domain/roots/user.factory";
import { AuthApplication } from "../application/auth.application";
import { AuthFactory } from "../domain/auth-factory";

export class AuthController {
  constructor(
    private readonly application: AuthApplication,
    private readonly userApplication: UserApplication
  ) {
    this.login = this.login.bind(this);
    this.newAccessToken = this.newAccessToken.bind(this);
    this.register = this.register.bind(this);
    this.enable2FA = this.enable2FA.bind(this);
    this.verify2FA = this.verify2FA.bind(this);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const auth = AuthFactory.create(email, password);
    const tokens = await this.application.login(auth);
    res.status(200).json(tokens);
  }

  async newAccessToken(req: Request, res: Response) {
    const { refreshToken } = req.body;

    const tokens = await this.application.getNewAccessToken(refreshToken);

    res.status(200).json(tokens);
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const props: UserProperties = {
      ...body,
      password: await Crypt.hash(body.password),
    };
    const user = UserFactory.create(props);
    await this.userApplication.save(user);

    const auth = AuthFactory.create(body.email, body.password);
    const tokens = await this.application.login(auth);
    const { secret, qr } = await OneTimePassword.generateQRAndSecret();

    res.json({ ...tokens, secret, qr });
  }

  async enable2FA(req: Request, res: Response, next: NextFunction) {
    const { userId } = res.locals;
    const { secret, token } = req.body;

    const isTokenValid = await OneTimePassword.verify2FA(secret, token);

    if (!isTokenValid) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userFoundResult = await this.userApplication.getById(userId);
    if (userFoundResult.isErr()) {
      return res.status(userFoundResult.error.status).json({
        statusCodeId: userFoundResult.error.statusCodeId,
        message: userFoundResult.error.message,
        stack: userFoundResult.error.stack,
        errorsDetails: userFoundResult.error.errorsDetails,
      });
    }

    const userFound = userFoundResult.value;
    userFound.update({ secret });

    const result = await this.userApplication.save(userFound);
    if (result.isErr()) {
      return res.status(result.error.status).json({
        statusCodeId: result.error.statusCodeId,
        message: result.error.message,
        stack: result.error.stack,
        errorsDetails: result.error.errorsDetails,
      });
    }

    res.status(200).json({ message: "2FA enabled" });
  }

  async verify2FA(req: Request, res: Response, next: NextFunction) {
    const { userId } = res.locals;
    const { token } = req.body;

    const userResult = await this.userApplication.getById(userId);
    if (userResult.isErr()) {
      return res.status(userResult.error.status).json({
        statusCodeId: userResult.error.statusCodeId,
        message: userResult.error.message,
        stack: userResult.error.stack,
        errorsDetails: userResult.error.errorsDetails,
      });
    }

    const user = userResult.value;

    const isTokenValidResult = OneTimePassword.verify2FA(
      user.properties.secret,
      token
    );

    if (isTokenValidResult.isErr()) {
      return res.status(isTokenValidResult.error.status).json({
        statusCodeId: isTokenValidResult.error.statusCodeId,
        message: isTokenValidResult.error.message,
        stack: isTokenValidResult.error.stack,
        errorsDetails: isTokenValidResult.error.errorsDetails,
      });
    }

    const tokens = await Tokens.generateTokens(user, true);
    res.status(200).json(tokens);
  }
}
