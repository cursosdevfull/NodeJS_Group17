import { IStudent, IStudentUpdate } from '../infrastructure/in-memory/student.inmemory';

export interface StudentPort {
  findAll(): Promise<IStudent[]>;
  findOne(id: number): Promise<IStudent | undefined>;
  getByPage(page: number, limit: number): Promise<IStudent[]>;
  create(student: IStudent): Promise<IStudent>;
  update(
    id: number,
    student: Partial<IStudentUpdate>
  ): Promise<IStudent | undefined>;
  delete(id: number): Promise<IStudent | undefined>;
}
