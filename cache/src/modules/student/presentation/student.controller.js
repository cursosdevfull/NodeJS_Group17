"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const student_1 = require("../domain/student");
class StudentController {
    constructor(repository, application) {
        this.repository = repository;
        this.application = application;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const students = yield this.application.getAll();
            res.json(students);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(Number(req.params.id)))
                return res.status(400).json({ message: "Invalid ID" });
            if (Number(req.params.id) < 1)
                return res.status(400).json({ message: "Invalid ID" });
            const student = yield this.application.getById(Number(req.params.id));
            res.json(student);
        });
    }
    getByPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, limit } = req.query;
            if (isNaN(Number(page)) || isNaN(Number(limit))) {
                return res.status(400).json({ message: "Invalid page or limit" });
            }
            if (Number(page) < 1 || Number(limit) < 1)
                return res.status(400).json({ message: "Invalid page or limit" });
            const students = yield this.application.getByPage(Number(page), Number(limit));
            res.json(students);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, lastname, age, email, phone, address, city, country, gender, career, semester, } = req.body;
            const regExp = new RegExp(/^([\w.-]+)@(\[(\d{1,3}\.){3}|(?!hotmail|gmail|googlemail|yahoo|gmx|ymail|outlook|bluewin|protonmail|t\-online|web\.|online\.|aol\.|live\.)(([a-zA-Z\d-]+\.)+))([a-zA-Z]{2,63}|\d{1,3})(\]?)$/);
            if (!regExp.test(email)) {
                return res.status(400).json({ message: "Invalid email" });
            }
            if (address.length < 5)
                return res.status(400).json({ message: "Invalid address" });
            if (city.length < 3)
                return res.status(400).json({ message: "Invalid city" });
            if (country.length < 3)
                return res.status(400).json({ message: "Invalid country" });
            if (!career.trim().toLowerCase().includes("ingenieria") &&
                !career.trim().toLowerCase().includes("ing"))
                return res.status(400).json({ message: "Invalid career" });
            const student = {
                name,
                lastname,
                age,
                email,
                phone,
                address,
                city,
                country,
                gender,
                career,
                semester,
            };
            const response = yield this.application.create(new student_1.Student(student));
            res.json(response);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = req.body;
            const response = yield this.application.update(Number(req.params.id), student);
            res.json(response);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.application.remove(Number(req.params.id));
            res.json(response);
        });
    }
}
exports.StudentController = StudentController;
