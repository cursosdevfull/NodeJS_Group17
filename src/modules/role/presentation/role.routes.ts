import { Router } from 'express';

import { RoleApplication } from '../application/role.application';
import { RoleRepository } from '../domain/repositories/role.repository';
import { RoleInfrastructure } from '../infrastructure/role.infrastructure';
import { RoleController } from './role.controller';

class RoleRoutes {
  private router = Router();

  constructor(private readonly controller: RoleController) {
    this.mountRoutes();
  }

  mountRoutes(): void {
    this.router.get("/v1/", this.controller.getAll);
  }

  getRouter() {
    return this.router;
  }
}
const repository: RoleRepository = new RoleInfrastructure();
const application = new RoleApplication(repository);
const controllerRole = new RoleController(application);
const router = new RoleRoutes(controllerRole).getRouter();

export { router };
