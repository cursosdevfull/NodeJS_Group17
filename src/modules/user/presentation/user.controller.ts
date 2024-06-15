import { Request, Response } from "express";

import { RedisBootstrap } from "../../../bootstrap/redis.bootstrap";
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

    const saveResult = await this.application.save(user);

    if (saveResult.isErr()) {
      return res.status(saveResult.error.status).json({
        statusCodeId: saveResult.error.statusCodeId,
        message: saveResult.error.message,
        stack: saveResult.error.stack,
        errorsDetails: saveResult.error.errorsDetails,
      });
    }

    res.status(201).json({ status: "User created" });
  }

  async update(req: Request, res: Response) {
    const body = req.body;
    const id: string = req.params.id;

    const userFoundResult = await this.application.getById(id);

    if (userFoundResult.isErr()) {
      return res.status(userFoundResult.error.status).json({
        statusCodeId: userFoundResult.error.statusCodeId,
        message: userFoundResult.error.message,
        stack: userFoundResult.error.stack,
        errorsDetails: userFoundResult.error.errorsDetails,
      });
    }

    const userFound = userFoundResult.value;
    userFound.update(body);

    const result = await this.application.save(userFound);
    if (result.isErr()) {
      return res.status(result.error.status).json({
        statusCodeId: result.error.statusCodeId,
        message: result.error.message,
        stack: result.error.stack,
        errorsDetails: result.error.errorsDetails,
      });
    }

    res.status(200).json({ status: "User updated" });
  }

  async delete(req: Request, res: Response) {
    const id: string = req.params.id;

    const userFoundResult = await this.application.getById(id);
    if (userFoundResult.isErr()) {
      return res.status(userFoundResult.error.status).json({
        statusCodeId: userFoundResult.error.statusCodeId,
        message: userFoundResult.error.message,
        stack: userFoundResult.error.stack,
        errorsDetails: userFoundResult.error.errorsDetails,
      });
    }

    const userFound = userFoundResult.value;
    userFound.delete();

    const result = await this.application.save(userFound);
    if (result.isErr()) {
      return res.status(result.error.status).json({
        statusCodeId: result.error.statusCodeId,
        message: result.error.message,
        stack: result.error.stack,
        errorsDetails: result.error.errorsDetails,
      });
    }

    res.status(200).json({ status: "User deleted" });
  }

  async getAll(req: Request, res: Response) {
    const usersResult = await this.application.getAll();

    if (usersResult.isErr()) {
      return res.status(usersResult.error.status).json({
        statusCodeId: usersResult.error.statusCodeId,
        message: usersResult.error.message,
        stack: usersResult.error.stack,
        errorsDetails: usersResult.error.errorsDetails,
      });
    }

    const users = usersResult.value;

    if (res.locals.cacheKey) {
      await RedisBootstrap.set(res.locals.cacheKey, JSON.stringify(users));
    }

    res.status(200).json(users);
  }

  async getById(req: Request, res: Response) {
    const id: string = req.params.id;

    const userResult = await this.application.getById(id);
    if (userResult.isErr()) {
      return res.status(userResult.error.status).json({
        statusCodeId: userResult.error.statusCodeId,
        message: userResult.error.message,
        stack: userResult.error.stack,
        errorsDetails: userResult.error.errorsDetails,
      });
    }

    const user = userResult.value;

    if (res.locals.cacheKey) {
      await RedisBootstrap.set(res.locals.cacheKey, JSON.stringify(user));
    }

    res.status(200).json(user);
  }

  async getByPage(req: Request, res: Response) {
    const page: number = parseInt(req.query.page as string);
    const limit: number = parseInt(req.query.limit as string);

    const usersResult = await this.application.getByPage(page, limit);
    if (usersResult.isErr()) {
      return res.status(usersResult.error.status).json({
        statusCodeId: usersResult.error.statusCodeId,
        message: usersResult.error.message,
        stack: usersResult.error.stack,
        errorsDetails: usersResult.error.errorsDetails,
      });
    }

    const users = usersResult.value;

    res.status(200).json(users);
  }
}
