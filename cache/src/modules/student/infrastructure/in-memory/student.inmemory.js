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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentInMemory = void 0;
const student_dto_1 = require("../dtos/student.dto");
const student_entity_1 = require("../entities/student.entity");
const student_json_1 = __importDefault(require("./student.json"));
class StudentInMemory {
    constructor() {
        this.students = student_json_1.default.map((student) => {
            const entity = new student_entity_1.StudentEntity();
            Object.assign(entity, student);
            return entity;
        });
    }
    static getInstance() {
        if (!StudentInMemory.instance) {
            StudentInMemory.instance = new StudentInMemory();
        }
        return StudentInMemory.instance;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.resolve([
                ...student_dto_1.StudentDto.fromDataToDomain(this.students.filter((el) => el.deletedAt === null)),
            ]);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = this.students.find((student) => student.id === id);
            if (student && student.deletedAt === null) {
                return yield Promise.resolve(student_dto_1.StudentDto.fromDataToDomain(student));
            }
            return undefined;
        });
    }
    getByPage(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.resolve(student_dto_1.StudentDto.fromDataToDomain(this.students
                .filter((el) => el.deletedAt === null)
                .slice((page - 1) * limit, page * limit)));
        });
    }
    create(student) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = student_dto_1.StudentDto.fromDomainToData(student);
            entity.id = this.students.length + 1;
            this.students.push(entity);
            return yield Promise.resolve(student_dto_1.StudentDto.fromDataToDomain(entity));
        });
    }
    update(id, student) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentIndex = this.students.findIndex((student) => student.id === id && student.deletedAt === null);
            if (studentIndex === -1) {
                return yield Promise.resolve(undefined);
            }
            const studentDomain = student_dto_1.StudentDto.fromDataToDomain(this.students[studentIndex]);
            studentDomain.update(student);
            const studentEntity = student_dto_1.StudentDto.fromDomainToData(studentDomain);
            this.students[studentIndex] = studentEntity;
            return yield Promise.resolve(studentDomain);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentIndex = this.students.findIndex((student) => student.id === id && student.deletedAt === null);
            if (studentIndex === -1) {
                return yield Promise.resolve(undefined);
            }
            const studentDomain = student_dto_1.StudentDto.fromDataToDomain(this.students[studentIndex]);
            studentDomain.delete();
            const studentEntity = student_dto_1.StudentDto.fromDomainToData(studentDomain);
            this.students[studentIndex] = studentEntity;
            return yield Promise.resolve(studentDomain);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = this.students.find((student) => student.email === email);
            if (student && student.deletedAt === null) {
                return yield Promise.resolve(student_dto_1.StudentDto.fromDataToDomain(student));
            }
            return undefined;
        });
    }
}
exports.StudentInMemory = StudentInMemory;
