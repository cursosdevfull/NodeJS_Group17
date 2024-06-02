import { Request, Response } from 'express';

import { RoleApplication } from '../application/role.application';

export class RoleController {
  constructor(private readonly application: RoleApplication) {
    this.getAll = this.getAll.bind(this);
  }

  async getAll(req: Request, res: Response) {
    const roles = await this.application.getAll();

    res.status(200).json(roles);
  }
}
