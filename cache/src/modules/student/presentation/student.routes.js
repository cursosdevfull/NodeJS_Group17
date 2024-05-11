"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = require("express");
const student_application_1 = require("../application/student.application");
const student_inmemory_1 = require("../infrastructure/in-memory/student.inmemory");
const student_controller_1 = require("./student.controller");
class StudentRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new student_controller_1.StudentController(student_inmemory_1.StudentInMemory.getInstance(), new student_application_1.StudentApplication(student_inmemory_1.StudentInMemory.getInstance()));
        this.mountRoutes();
    }
    mountRoutes() {
        this.router.get("/", this.controller.getAll.bind(this.controller)); // this.controller.getAll.bind(this.controller)   !== this.controller.getAll
        this.router.get("/page", this.controller.getByPage.bind(this.controller));
        this.router.get("/:id", this.controller.getOne.bind(this.controller));
        this.router.post("/", this.controller.create.bind(this.controller));
        this.router.put("/:id", this.controller.update.bind(this.controller));
        this.router.delete("/:id", this.controller.delete.bind(this.controller));
    }
}
exports.StudentRoutes = StudentRoutes;
exports.default = new StudentRoutes().router;
