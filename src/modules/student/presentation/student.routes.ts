import { Router } from "express";

import { StudentApplication } from "../application/student.application";
import { StudentInMemory } from "../infrastructure/in-memory/student.inmemory";
import { StudentController } from "./student.controller";

export class StudentRoutes {
  readonly router: Router;
  readonly controller: StudentController;

  constructor() {
    this.router = Router();
    this.controller = new StudentController(
      StudentInMemory.getInstance(),
      new StudentApplication(StudentInMemory.getInstance())
    );
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
