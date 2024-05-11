import { StudentBuilder } from "./builder";
import { Student } from "./student";

const student: Student = new StudentBuilder()
  .addId(1)
  .addName("John")
  .addLastname("Doe")
  .addAge(30)
  .addEmail("john.doe@email.com")
  .addGender("M")
  .addAddress("123 Main St")
  .addPhone("123-456-7890")
  .addCoursesEnrolled(["Math", "Science"])
  .addCoursesFinished(["History"])
  .addCoursesInProgress(["English"])
  .build();

console.log(student);
