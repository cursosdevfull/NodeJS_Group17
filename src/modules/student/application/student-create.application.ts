import { StudentPort } from '../domain/repositories/student.port';
import { Student } from '../domain/student';

class StudentCreateApplication {
  constructor(private readonly repository: StudentPort) {}

  async execute(student: Student) {
    const studentFound = await this.repository.findByEmail(
      student.properties.email
    );

    if (studentFound) throw new Error("Email already exists");

    return this.repository.create(student);
  }
}
