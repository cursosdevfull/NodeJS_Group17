import { Expose, plainToInstance } from "class-transformer";

import { Student } from "../../domain/student";

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

    /*     const studentResponse = new StudentResponse();
    //Object.assign(studentResponse, data);
    const { id, name, lastname, age, email } = data.properties;
    studentResponse.id = id;
    studentResponse.name = name;
    studentResponse.lastname = lastname;
    studentResponse.age = age;
    studentResponse.email = email; */

    //return studentResponse;
  }
}
