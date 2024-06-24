import { readFile, writeFile } from 'node:fs';
import { join } from 'node:path';

import { StudentPort } from '../../domain/repositories/student.port';
import { IStudentUpdate, Student } from '../../domain/student';
import { StudentDto } from '../dtos/student.dto';
import { StudentEntity } from '../entities/student.entity';

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

  private constructor() {
    // this intencional
  }

  static getInstance(): StudentInMemory {
    if (!StudentInMemory.instance) {
      StudentInMemory.instance = new StudentInMemory();
    }
    return StudentInMemory.instance;
  }

  async findAll(): Promise<Student[]> {
    const students: StudentEntity[] = await this.readData();

    return Promise.resolve([
      ...(StudentDto.fromDataToDomain(
        students.filter((el) => !el.deletedAt || el.deletedAt === null)
      ) as Student[]),
    ]);
  }

  async findOne(id: number): Promise<Student | undefined> {
    const data = await this.readData();
    const student = data.find((item) => item.id === id);

    if (student && student.deletedAt === null) {
      return Promise.resolve(StudentDto.fromDataToDomain(student) as Student);
    }

    return undefined;
  }

  async getByPage(page: number, limit: number): Promise<Student[]> {
    const students = await this.readData();

    return Promise.resolve(
      StudentDto.fromDataToDomain(
        students
          .filter((el) => !el.deletedAt || el.deletedAt === null)
          .slice((page - 1) * limit, page * limit)
      ) as Student[]
    );
  }

  async create(student: Student): Promise<Student> {
    const students = await this.readData();

    const entity = StudentDto.fromDomainToData(student) as StudentEntity;
    entity.id = students.length + 1;

    students.push(entity);

    this.writeData(students);

    return Promise.resolve(StudentDto.fromDataToDomain(entity) as Student);
  }

  async update(
    id: number,
    student: Partial<IStudentUpdate>
  ): Promise<Student | undefined> {
    const students = await this.readData();

    const studentIndex = students.findIndex(
      (item) => item.id === id && (!item.deletedAt || item.deletedAt === null)
    );
    if (studentIndex === -1) {
      return Promise.resolve(undefined);
    }

    const studentDomain = StudentDto.fromDataToDomain(
      students[studentIndex]
    ) as Student;

    studentDomain.update(student);

    const studentEntity = StudentDto.fromDomainToData(
      studentDomain
    ) as StudentEntity;

    students[studentIndex] = studentEntity;

    this.writeData(students);

    return Promise.resolve(studentDomain);
  }

  async delete(id: number): Promise<Student | undefined> {
    const students = await this.readData();

    const studentIndex = students.findIndex(
      (student) =>
        student.id === id && (!student.deletedAt || student.deletedAt === null)
    );
    if (studentIndex === -1) {
      return Promise.resolve(undefined);
    }
    const studentDomain = StudentDto.fromDataToDomain(
      students[studentIndex]
    ) as Student;

    studentDomain.delete();

    const studentEntity = StudentDto.fromDomainToData(
      studentDomain
    ) as StudentEntity;
    students[studentIndex] = studentEntity;

    this.writeData(students);

    return Promise.resolve(studentDomain);
  }

  async findByEmail(email: string): Promise<Student> {
    const students = await this.readData();

    const student = students.find((item) => item.email === email);

    if (student && (!student.deletedAt || student.deletedAt === null)) {
      return Promise.resolve(StudentDto.fromDataToDomain(student) as Student);
    }

    return undefined;
  }

  private async readData(): Promise<StudentEntity[]> {
    return JSON.parse(await this.readFileJson()).map(this.convertToData);
  }

  private readFileJson(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      readFile(
        join(__dirname, "../data", "student.json"),
        "utf-8",
        (err, data) => {
          if (err) throw err;
          return resolve(data);
        }
      );
    });
  }

  private convertToData(student: IStudent): StudentEntity {
    const entity = new StudentEntity();
    Object.assign(entity, student);
    return entity;
  }

  private writeData(data: StudentEntity[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      writeFile(
        join(__dirname, "../data", "student.json"),
        JSON.stringify(data),
        (err) => {
          if (err) throw err;
          return resolve();
        }
      );
    });
  }
}
