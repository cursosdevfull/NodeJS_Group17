export interface UserDataProperties {
  id: number;
  name: string;
  lastname: string;
  email: string;
  age?: number;
  gender?: string;
  password: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

// Modelo de datos
export class UserData {
  id!: number;
  name!: string;
  lastname!: string;
  email!: string;
  age?: number;
  gender?: string;
  password!: string;
  createdAt!: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(properties: UserDataProperties) {
    this.id = properties.id;
    this.name = properties.name;
    this.lastname = properties.lastname;
    this.email = properties.email;
    this.age = properties.age;
    this.gender = properties.gender;
    this.password = properties.password;
    this.createdAt = properties.createdAt;
    this.updatedAt = properties.updatedAt;
    this.deletedAt = properties.deletedAt;
  }
}
