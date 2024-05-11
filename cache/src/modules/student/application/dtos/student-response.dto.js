"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentResponseDto = exports.StudentResponse = void 0;
const class_transformer_1 = require("class-transformer");
class StudentResponse {
}
exports.StudentResponse = StudentResponse;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], StudentResponse.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], StudentResponse.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], StudentResponse.prototype, "lastname", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], StudentResponse.prototype, "age", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], StudentResponse.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], StudentResponse.prototype, "phone", void 0);
class StudentResponseDto {
    static fromDomainToResponse(data) {
        if (Array.isArray(data)) {
            return data.map((student) => this.fromDomainToResponse(student));
        }
        return (0, class_transformer_1.plainToInstance)(StudentResponse, data, {
            excludeExtraneousValues: true,
        });
        /*     const studentResponse = new StudentResponse();
        //Object.assign(studentResponse, data);
        const { id, name, lastname, age, email } = data.properties;
        studentResponse.id = id;
        studentResponse.name = name;
        studentResponse.lastname = lastname;
        studentResponse.age = age;
        studentResponse.email = email; */
        //return studentResponse;
    }
}
exports.StudentResponseDto = StudentResponseDto;
