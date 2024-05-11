import { IStudentUpdate, Student } from "../student";

export interface StudentPort {
  findAll(): Promise<Student[]>;
  findOne(id: number): Promise<Student | undefined>;
  getByPage(page: number, limit: number): Promise<Student[]>;
  create(student: Student): Promise<Student>;
  update(
    id: number,
    student: Partial<IStudentUpdate>
  ): Promise<Student | undefined>;
  delete(id: number): Promise<Student | undefined>;
  findByEmail(email: string): Promise<Student | undefined>;
}
