import { Role } from '../../domain/role';
import { RoleEntity } from '../entities/role.entity';

export class RoleDto {
  static fromDomainToData(data: Role | Role[]): RoleEntity | RoleEntity[] {
    if (Array.isArray(data)) {
      return data.map((item) => RoleDto.fromDomainToData(item)) as RoleEntity[];
    }

    const roleEntity = new RoleEntity();
    roleEntity.roleId = data.properties.roleId;
    roleEntity.roleName = data.properties.roleName;

    return roleEntity;
  }

  static fromDataToDomain(data: RoleEntity | RoleEntity[]): Role | Role[] {
    if (Array.isArray(data)) {
      return data.map((item) => RoleDto.fromDataToDomain(item)) as Role[];
    }

    return new Role(data.roleId, data.roleName);
  }
}
