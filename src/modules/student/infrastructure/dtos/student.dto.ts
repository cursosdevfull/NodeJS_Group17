import { Student } from '../../domain/student';
import { StudentEntity } from '../entities/student.entity';

export class StudentDto {
  static fromDomainToData(
    data: Student | Student[]
  ): StudentEntity | StudentEntity[] {
    if (Array.isArray(data)) {
      return data.map((student) =>
        this.fromDomainToData(student)
      ) as StudentEntity[];
    }

    const studentEntity = new StudentEntity();
    Object.assign(studentEntity, data.properties);

    return studentEntity;
  }

  static fromDataToDomain(
    data: StudentEntity | StudentEntity[]
  ): Student | Student[] {
    if (Array.isArray(data)) {
      return data.map((student) => this.fromDataToDomain(student)) as Student[];
    }

    return new Student(data);
  }
}
