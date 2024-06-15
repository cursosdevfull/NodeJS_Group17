import express, { Application, Request, Response } from "express";

import { InvalidationQueryCache } from "./core/cache/query.cache";
import { ResponseInterceptor } from "./core/interceptors/response.interceptor";
import { Status } from "./core/status/status";
import { router as authRouter } from "./modules/auth/presentation/auth.routes";
import { router as roleRouter } from "./modules/role/presentation/role.routes";
import { router as userRouter } from "./modules/user/presentation/user.routes";

class App {
  readonly application: Application;

  constructor() {
    this.application = express();
    this.mountMiddlewares();
    this.mountInterceptors();
    this.mountHealthCheck();
    this.mountRoutes();
    this.mountInvalidCache();
  }

  private mountMiddlewares() {
    this.application.use(express.json());
    this.application.use(express.urlencoded({ extended: true }));
  }

  private mountInterceptors() {
    this.application.use(ResponseInterceptor);
  }

  private mountHealthCheck() {
    this.application.get("/", this.isRunningAll);
    this.application.get("/health", this.isRunningAll);
    this.application.get("/healthcheck", this.isRunningAll);
  }

  private mountRoutes() {
    this.application.use("/user", userRouter);
    this.application.use("/role", roleRouter);
    this.application.use("/auth", authRouter);
  }

  private mountInvalidCache() {
    this.application.get("/invalidate-cache", InvalidationQueryCache.execute());
  }

  private async isRunningAll(req: Request, res: Response) {
    const isRunning = await Status.isRunningAll();
    if (isRunning) {
      res.send("I'm alive");
    } else {
      res.status(500).send("I'm not alive");
    }
  }
}

export default new App().application;
