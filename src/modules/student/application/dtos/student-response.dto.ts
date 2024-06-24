import { Expose, plainToInstance } from 'class-transformer';

import { Student } from '../../domain/student';

export class StudentResponse {
  @Expose() id: number;
  @Expose() name: string;
  @Expose() lastname: string;
  @Expose() age: number;
  @Expose() email: string;
  @Expose() phone: string;
}

export class StudentResponseDto {
  static fromDomainToResponse(
    data: Student | Student[]
  ): StudentResponse | StudentResponse[] {
    if (Array.isArray(data)) {
      return data.map((student) =>
        this.fromDomainToResponse(student)
      ) as StudentResponse[];
    }

    return plainToInstance(StudentResponse, data, {
      excludeExtraneousValues: true,
    });
  }
}
