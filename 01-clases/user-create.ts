import { User } from "./user";
import { UserRepository } from "./user.interface";

export class UserCreate {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(user: User) {
    //const infrastructure = new UserInfrastructure();
    // Check if the user is already created
    const emailFound = await this.repository.findUserByEmail(
      user.properties().email
    );

    if (emailFound) {
      throw new Error("User already created");
    }
    // If user is not created, create it
    return await this.repository.insert(user);
  }
}
