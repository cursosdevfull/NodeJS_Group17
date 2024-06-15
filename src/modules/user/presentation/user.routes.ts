import { Router } from "express";

import { QueryCache } from "../../../core/cache/query.cache";
import { AuthenticationGuard } from "../../../core/guards/authentication.guard";
import { AuthorizationGuard } from "../../../core/guards/authorization.guard";
import { UserApplication } from "../application/user.application";
import { UserRepository } from "../domain/repositories/user.repository";
import { UserInfrastructure } from "../infrastructure/user.infrastructure";
import { UserController } from "./user.controller";

class UserRoutes {
  private router = Router();

  constructor(private readonly controller: UserController) {
    this.mountRoutes();
  }

  mountRoutes(): void {
    const authentication = new AuthenticationGuard();
    const authorization = new AuthorizationGuard();

    this.router.post(
      "/v1/",
      authentication.execute2FA(true).canActivate,
      authorization.rolesAllowed("ADMIN").canActivate,
      this.controller.create
    );
    this.router.get(
      "/v1/",
      authentication.execute2FA(true).canActivate,
      authorization.rolesAllowed("ADMIN", "OPERATOR").canActivate,
      QueryCache.build("users"),
      this.controller.getAll
    );
    this.router.get(
      "/v1/:userId",
      authentication.execute2FA(true).canActivate,
      authorization.rolesAllowed("ADMIN").canActivate,
      QueryCache.build("users"),
      this.controller.getById
    );
    this.router.put(
      "/v1/:userId",
      authentication.execute2FA(true).canActivate,
      authorization.rolesAllowed("ADMIN").canActivate,
      this.controller.update
    );
    this.router.delete(
      "/v1/:userId",
      authentication.execute2FA(true).canActivate,
      authorization.rolesAllowed("ADMIN").canActivate,
      this.controller.delete
    );
    this.router.get(
      "/v1/page",
      authentication.execute2FA(true).canActivate,
      authorization.rolesAllowed("ADMIN").canActivate,
      this.controller.getByPage
    );
  }

  getRouter() {
    return this.router;
  }
}
const repository: UserRepository = new UserInfrastructure();
const application = new UserApplication(repository);
const controller = new UserController(application);
const router = new UserRoutes(controller).getRouter();

export { router };
