"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_routes_1 = __importDefault(require("./modules/student/presentation/student.routes"));
class App {
    constructor() {
        this.application = (0, express_1.default)();
        this.mountMiddlewares();
        this.mounthRoutes();
    }
    mountMiddlewares() {
        this.application.use(express_1.default.json());
        this.application.use(express_1.default.urlencoded({ extended: true }));
    }
    mounthRoutes() {
        this.application.use("/student", student_routes_1.default);
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
exports.default = new App().application;
