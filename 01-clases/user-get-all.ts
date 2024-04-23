import { UserRepository } from "./user.interface";

export class UserGetAll {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run() {
    return await this.repository.getAll();
  }
}
