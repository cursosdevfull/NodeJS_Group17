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
class StudentCreateApplication {
    constructor(repository) {
        this.repository = repository;
    }
    execute(student) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentFound = yield this.repository.findByEmail(student.properties.email);
            if (studentFound)
                throw new Error("Email already exists");
            const result = yield this.repository.create(student);
            return result;
        });
    }
}
/* const infrastructure: StudentPort = StudentInMemory.getInstance();
const application = new StudentCreateApplication(infrastructure);

application.execute({
  name: "John",
  lastname: "Doe",
  age: 20,
  email: "john.doe@email.com",
  phone: "123456789",
  address: "123 Main St",
  city: "SpringField",
  country: "USA",
  gender: "M",
  career: "Computer Science",
  semester: 1,
});
 */
