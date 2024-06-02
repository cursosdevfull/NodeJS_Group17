import { RoleRepository } from '../domain/repositories/role.repository';

export class RoleApplication {
  constructor(private readonly repository: RoleRepository) {}

  async getAll() {
    return await this.repository.getAll();
  }
}
