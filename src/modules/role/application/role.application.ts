import { RoleRepository } from '../domain/repositories/role.repository';

export class RoleApplication {
  constructor(private readonly repository: RoleRepository) {}

  async getAll() {
    return this.repository.getAll();
  }
}
