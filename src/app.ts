import express, { Application } from "express";

import studentRouter from "./modules/student/presentation/student.routes";

class App {
  readonly application: Application;

  constructor() {
    console.log("App constructor");
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
