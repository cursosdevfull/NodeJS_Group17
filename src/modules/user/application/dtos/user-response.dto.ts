import { User } from "../../domain/roots/user";

export class UserResponse {
  userId: string;
  email: string;
  name: string;
  lastname: string;
  image: string;
  roles: { roleId: string; roleName: string }[];
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
      roles: domain.properties.roles.map((role) => ({
        roleId: role.properties.roleId,
        roleName: role.properties.roleName,
      })),
    };
  }
}
