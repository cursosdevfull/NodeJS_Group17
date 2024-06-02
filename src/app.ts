import express, { Application } from 'express';

import { router as authRouter } from './modules/auth/presentation/auth.routes';
import { router as roleRouter } from './modules/role/presentation/role.routes';
import { router as userRouter } from './modules/user/presentation/user.routes';

class App {
  readonly application: Application;

  constructor() {
    this.application = express();
    this.mountMiddlewares();
    this.mountHealthCheck();
    this.mounthRoutes();
  }

  private mountMiddlewares() {
    this.application.use(express.json());
    this.application.use(express.urlencoded({ extended: true }));
  }

  private mountHealthCheck() {
    this.application.get("/", (req, res) => {
      res.send("I'm alive");
    });
    this.application.get("/health", (req, res) => {
      res.send("I'm alive");
    });
    this.application.get("/healthcheck", (req, res) => {
      res.send("I'm alive");
    });
  }

  private mounthRoutes() {
    this.application.use("/user", userRouter);
    this.application.use("/role", roleRouter);
    this.application.use("/auth", authRouter);
  }
}

export default new App().application;
