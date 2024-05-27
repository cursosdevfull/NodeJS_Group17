import { User } from "../../domain/roots/user";

class UserResponse {
  userId: string;
  email: string;
  name: string;
  lastname: string;
  image: string;
  roles: string[];
}

export class UserResponseDto {
  static transform(domain: User | User[]): UserResponse | UserResponse[] {
    if (Array.isArray(domain)) {
      return domain.map((user) => this.transform(user)) as UserResponse[];
    }

    return {
      userId: domain.properties.userId,
      email: domain.properties.email,
      name: domain.properties.name,
      lastname: domain.properties.lastname,
      image: domain.properties.image,
      roles: domain.properties.roles,
    };
  }
}
