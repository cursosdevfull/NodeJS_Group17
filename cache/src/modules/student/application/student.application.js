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
exports.StudentApplication = void 0;
const student_response_dto_1 = require("./dtos/student-response.dto");
class StudentApplication {
    constructor(repository) {
        this.repository = repository;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const students = yield this.repository.findAll();
            return student_response_dto_1.StudentResponseDto.fromDomainToResponse(students);
        });
    }
    create(student) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentFound = yield this.repository.findByEmail(student.properties.email);
            if (studentFound)
                throw new Error("Email already exists");
            return student_response_dto_1.StudentResponseDto.fromDomainToResponse(yield this.repository.create(student));
        });
    }
    getByPage(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const students = yield this.repository.getByPage(page, limit);
            return student_response_dto_1.StudentResponseDto.fromDomainToResponse(students);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield this.repository.findOne(id);
            return student_response_dto_1.StudentResponseDto.fromDomainToResponse(student);
        });
    }
    update(id, student) {
        return __awaiter(this, void 0, void 0, function* () {
            return student_response_dto_1.StudentResponseDto.fromDomainToResponse(yield this.repository.update(id, student));
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return student_response_dto_1.StudentResponseDto.fromDomainToResponse(yield this.repository.delete(id));
        });
    }
}
exports.StudentApplication = StudentApplication;
