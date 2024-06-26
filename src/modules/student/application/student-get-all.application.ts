import { StudentPort } from '../domain/repositories/student.port';

class StudentGetAllApplication {
  constructor(private readonly repository: StudentPort) {}

  async execute() {
    return this.repository.findAll();
  }
}
