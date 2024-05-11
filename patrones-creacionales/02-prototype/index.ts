import { Student } from "./student";

const student = new Student({
  id: 1,
  name: "John",
  lastname: "Doe",
  age: 30,
  email: "john.doe@email.com",
  gender: "M",
  address: "123 Main St",
  phone: "123-456-7890",
  coursesEnrolled: ["Math", "Science"],
  coursesFinished: ["History"],
  coursesInProgress: ["English"],
});

const student2 = student.copy();

student.update("Jane");

console.log("STUDENT", student);
console.log("STUDENT2", student2);
