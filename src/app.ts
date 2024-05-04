import express, { Application } from 'express';

import studentRouter from './modules/student/presentation/student.routes';

class App {
  readonly application: Application;

  constructor() {
    this.application = express();
    this.mountMiddlewares();
    this.mounthRoutes();
  }

  private mountMiddlewares() {
    this.application.use(express.json());
    this.application.use(express.urlencoded({ extended: true }));
  }

  private mounthRoutes() {
    this.application.use("/student", studentRouter);

    this.application.get("/teacher", (req, res) => {
      res.send("Teacher's list");
    });

    this.application.get("/teacher/details", (req, res) => {
      res.send("Teacher's details");
    });

    this.application.get("/teacher/page", (req, res) => {
      res.send("Teacher's page");
    });
  }
}

export default new App().application;
