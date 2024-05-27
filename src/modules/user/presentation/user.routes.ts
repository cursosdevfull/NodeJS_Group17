import { Router } from "express";

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
    this.router.post("/v1/", this.controller.create);
    this.router.get("/v1/", this.controller.getAll);
    this.router.get("/v1/:userId", this.controller.getById);
    this.router.put("/v1/:userId", this.controller.update);
    this.router.delete("/v1/:userId", this.controller.delete);
    this.router.get("/v1/page", this.controller.getByPage);
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
