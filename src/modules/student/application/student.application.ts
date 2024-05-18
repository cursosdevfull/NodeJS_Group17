import { StudentPort } from "../domain/repositories/student.port";
import { IStudentUpdate, Student } from "../domain/student";
import { StudentResponseDto } from "./dtos/student-response.dto";

export class StudentApplication {
  constructor(private readonly repository: StudentPort) {
    console.log("StudentApplication constructor");
  }

  async getAll() {
    const students = await this.repository.findAll();
    return StudentResponseDto.fromDomainToResponse(students);
  }

  async create(student: Student) {
    const studentFound = await this.repository.findByEmail(
      student.properties.email
    );

    if (studentFound) throw new Error("Email already exists");

    return StudentResponseDto.fromDomainToResponse(
      await this.repository.create(student)
    );
  }

  async getByPage(page: number, limit: number) {
    const students = await this.repository.getByPage(page, limit);
    return StudentResponseDto.fromDomainToResponse(students);
  }

  async getById(id: number) {
    const student = await this.repository.findOne(id);
    return StudentResponseDto.fromDomainToResponse(student);
  }

  async update(id: number, student: Partial<IStudentUpdate>) {
    return StudentResponseDto.fromDomainToResponse(
      await this.repository.update(id, student)
    );
  }

  async remove(id: number) {
    return StudentResponseDto.fromDomainToResponse(
      await this.repository.delete(id)
    );
  }
}
