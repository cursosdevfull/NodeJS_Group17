import { Router } from 'express';

import { AuthenticationGuard } from '../../../core/guards/authentication.guard';
import { UserApplication } from '../../user/application/user.application';
import { UserRepository } from '../../user/domain/repositories/user.repository';
import { UserInfrastructure } from '../../user/infrastructure/user.infrastructure';
import { AuthApplication } from '../application/auth.application';
import { AuthController } from './auth.controller';

class AuthRoutes {
  private router = Router();

  constructor(private readonly controller: AuthController) {
    this.mountRoutes();
  }

  mountRoutes(): void {
    const authentication = new AuthenticationGuard();

    this.router.post("/v1/login", this.controller.login);
    this.router.post("/v1/new-access-token", this.controller.newAccessToken);
    this.router.post("/v1/register", this.controller.register);
    this.router.post(
      "/v1/enable-2fa",
      authentication.execute2FA(false).canActivate,
      this.controller.enable2FA
    );
    this.router.post(
      "/v1/verify-2fa",
      authentication.execute2FA(false).canActivate,
      this.controller.verify2FA
    );
  }

  getRouter() {
    return this.router;
  }
}
const userRepository: UserRepository = new UserInfrastructure();
const application = new AuthApplication(userRepository);
const userApplication = new UserApplication(userRepository);
const controller = new AuthController(application, userApplication);
const router = new AuthRoutes(controller).getRouter();

export { router };
