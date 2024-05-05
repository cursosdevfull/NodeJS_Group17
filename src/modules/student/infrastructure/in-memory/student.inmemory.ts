import { StudentPort } from '../../domain/repositories/student.port';
import studentData from './student.json';

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

export interface IStudentUpdate {
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
}

export class StudentInMemory implements StudentPort {
  private static instance: StudentInMemory;

  private students: IStudent[] = studentData.map((student) => ({
    ...student,
    createdAt: new Date(student.createdAt),
    updatedAt: student.updatedAt ? new Date(student.updatedAt) : undefined,
    deletedAt: student.deletedAt ? new Date(student.deletedAt) : undefined,
  }));

  private constructor() {}

  static getInstance(): StudentInMemory {
    if (!StudentInMemory.instance) {
      StudentInMemory.instance = new StudentInMemory();
    }
    return StudentInMemory.instance;
  }

  async findAll(): Promise<IStudent[]> {
    return await Promise.resolve([...this.students]);
  }

  async findOne(id: number): Promise<IStudent | undefined> {
    return await Promise.resolve(
      this.students.find((student) => student.id === id)
    );
  }

  async getByPage(page: number, limit: number): Promise<IStudent[]> {
    return await Promise.resolve(
      this.students.slice((page - 1) * limit, page * limit)
    );
  }

  async create(student: IStudent): Promise<IStudent> {
    const newStudent = {
      ...student,
      id: this.students.length + 1,
      createdAt: new Date(),
    };
    this.students.push(newStudent);
    return await Promise.resolve(newStudent);
  }

  async update(
    id: number,
    student: Partial<IStudentUpdate>
  ): Promise<IStudent | undefined> {
    const studentIndex = this.students.findIndex(
      (student) => student.id === id
    );
    if (studentIndex === -1) {
      return await Promise.resolve(undefined);
    }
    const updatedStudent = {
      ...this.students[studentIndex],
      ...student,
      updatedAt: new Date(),
    };
    this.students[studentIndex] = updatedStudent;
    return await Promise.resolve(updatedStudent);
  }

  async delete(id: number): Promise<IStudent | undefined> {
    const studentIndex = this.students.findIndex(
      (student) => student.id === id
    );
    if (studentIndex === -1) {
      return await Promise.resolve(undefined);
    }
    const deletedStudent = {
      ...this.students[studentIndex],
      deletedAt: new Date(),
    };
    this.students[studentIndex] = deletedStudent;
    return await Promise.resolve(deletedStudent);
  }
}
