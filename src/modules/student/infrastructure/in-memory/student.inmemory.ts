import { StudentPort } from "../../domain/repositories/student.port";
import { IStudentUpdate, Student } from "../../domain/student";
import { StudentDto } from "../dtos/student.dto";
import { StudentEntity } from "../entities/student.entity";
import studentData from "./student.json";

export interface IStudent {
  id?: number;
  name: string;
  lastname: string;
  age: number;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  gender: string;
  career: string;
  semester: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class StudentInMemory implements StudentPort {
  private static instance: StudentInMemory;

  private students: StudentEntity[] = studentData.map((student) => {
    const entity = new StudentEntity();
    Object.assign(entity, student);
    return entity;
  });

  private constructor() {}

  static getInstance(): StudentInMemory {
    if (!StudentInMemory.instance) {
      StudentInMemory.instance = new StudentInMemory();
    }
    return StudentInMemory.instance;
  }

  async findAll(): Promise<Student[]> {
    return await Promise.resolve([
      ...(StudentDto.fromDataToDomain(
        this.students.filter((el) => el.deletedAt === null)
      ) as Student[]),
    ]);
  }

  async findOne(id: number): Promise<Student | undefined> {
    const student = this.students.find((student) => student.id === id);

    if (student && student.deletedAt === null) {
      return await Promise.resolve(
        StudentDto.fromDataToDomain(student) as Student
      );
    }

    return undefined;
  }

  async getByPage(page: number, limit: number): Promise<Student[]> {
    return await Promise.resolve(
      StudentDto.fromDataToDomain(
        this.students
          .filter((el) => el.deletedAt === null)
          .slice((page - 1) * limit, page * limit)
      ) as Student[]
    );
  }

  async create(student: Student): Promise<Student> {
    const entity = StudentDto.fromDomainToData(student) as StudentEntity;
    entity.id = this.students.length + 1;

    this.students.push(entity);
    return await Promise.resolve(
      StudentDto.fromDataToDomain(entity) as Student
    );
  }

  async update(
    id: number,
    student: Partial<IStudentUpdate>
  ): Promise<Student | undefined> {
    const studentIndex = this.students.findIndex(
      (student) => student.id === id && student.deletedAt === null
    );
    if (studentIndex === -1) {
      return await Promise.resolve(undefined);
    }

    const studentDomain = StudentDto.fromDataToDomain(
      this.students[studentIndex]
    ) as Student;

    studentDomain.update(student);

    const studentEntity = StudentDto.fromDomainToData(
      studentDomain
    ) as StudentEntity;
    this.students[studentIndex] = studentEntity;
    return await Promise.resolve(studentDomain);
  }

  async delete(id: number): Promise<Student | undefined> {
    const studentIndex = this.students.findIndex(
      (student) => student.id === id && student.deletedAt === null
    );
    if (studentIndex === -1) {
      return await Promise.resolve(undefined);
    }
    const studentDomain = StudentDto.fromDataToDomain(
      this.students[studentIndex]
    ) as Student;

    studentDomain.delete();

    const studentEntity = StudentDto.fromDomainToData(
      studentDomain
    ) as StudentEntity;
    this.students[studentIndex] = studentEntity;
    return await Promise.resolve(studentDomain);
  }

  async findByEmail(email: string): Promise<Student> {
    const student = this.students.find((student) => student.email === email);

    if (student && student.deletedAt === null) {
      return await Promise.resolve(
        StudentDto.fromDataToDomain(student) as Student
      );
    }

    return undefined;
  }
}
