import { StudentPort } from "../domain/repositories/student.port";
import { Student } from "../domain/student";

class StudentCreateApplication {
  constructor(private readonly repository: StudentPort) {}

  async execute(student: Student) {
    const studentFound = await this.repository.findByEmail(
      student.properties.email
    );

    if (studentFound) throw new Error("Email already exists");

    const result: Student = await this.repository.create(student);

    return result;
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
