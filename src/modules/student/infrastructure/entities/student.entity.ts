export class StudentEntity {
  id: number;
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
  createdAt: Date;
  updatedAt: Date | undefined | null;
  deletedAt: Date | undefined | null;
}
