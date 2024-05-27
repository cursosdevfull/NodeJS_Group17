import { Router } from "express";

import studentController from "./student.controller";

export class StudentRoutes {
  readonly router: Router;
  readonly controller = studentController;

  constructor() {
    this.router = Router();
    /*this.controller = new StudentController(
      new StudentApplication(StudentInMemory.getInstance())
    );*/
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.get("/", this.controller.getAll.bind(this.controller)); // this.controller.getAll.bind(this.controller)   !== this.controller.getAll
    this.router.get("/page", this.controller.getByPage.bind(this.controller));
    this.router.get("/:id", this.controller.getOne.bind(this.controller));
    this.router.post("/", this.controller.create.bind(this.controller));
    this.router.put("/:id", this.controller.update.bind(this.controller));
    this.router.delete("/:id", this.controller.delete.bind(this.controller));
  }
}

export default new StudentRoutes().router;
