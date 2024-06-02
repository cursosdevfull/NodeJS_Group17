import { Role } from '../role';

export interface RoleRepository {
  getAll(): Promise<Role[]>;
}
