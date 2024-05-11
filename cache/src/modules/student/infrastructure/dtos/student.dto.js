"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentDto = void 0;
const student_1 = require("../../domain/student");
const student_entity_1 = require("../entities/student.entity");
class StudentDto {
    static fromDomainToData(data) {
        if (Array.isArray(data)) {
            return data.map((student) => this.fromDomainToData(student));
        }
        const studentEntity = new student_entity_1.StudentEntity();
        Object.assign(studentEntity, data.properties);
        return studentEntity;
    }
    static fromDataToDomain(data) {
        if (Array.isArray(data)) {
            return data.map((student) => this.fromDataToDomain(student));
        }
        const studentDomain = new student_1.Student(data);
        return studentDomain;
    }
}
exports.StudentDto = StudentDto;
