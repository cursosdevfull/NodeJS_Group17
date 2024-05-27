import { Request, Response } from "express";

import { Crypt } from "../../../core/services/crypt";
import { UserApplication } from "../application/user.application";
import { UserProperties } from "../domain/roots/user";
import { UserFactory } from "../domain/roots/user.factory";

export class UserController {
  constructor(private readonly application: UserApplication) {
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.getByPage = this.getByPage.bind(this);
  }

  async create(req: Request, res: Response) {
    const body = req.body;
    const props: UserProperties = {
      ...body,
      password: await Crypt.hash(body.password),
    };
    const user = UserFactory.create(props);

    await this.application.save(user);

    res.status(201).json({ status: "User created" });
  }

  async update(req: Request, res: Response) {
    const body = req.body;
    const id: string = req.params.id;

    const userFound = await this.application.getById(id);

    userFound.update(body);

    await this.application.save(userFound);

    res.status(200).json({ status: "User updated" });
  }

  async delete(req: Request, res: Response) {
    const id: string = req.params.id;

    const userFound = await this.application.getById(id);

    userFound.delete();

    await this.application.save(userFound);

    res.status(200).json({ status: "User deleted" });
  }

  async getAll(req: Request, res: Response) {
    const users = await this.application.getAll();

    res.status(200).json(users);
  }

  async getById(req: Request, res: Response) {
    const id: string = req.params.id;

    const user = await this.application.getById(id);

    res.status(200).json(user);
  }

  async getByPage(req: Request, res: Response) {
    const page: number = parseInt(req.query.page as string);
    const limit: number = parseInt(req.query.limit as string);

    const users = await this.application.getByPage(page, limit);

    res.status(200).json(users);
  }
}
