import { User, UserProperties } from "./user";
import { UserCreate } from "./user-create";
import { UserGetAll } from "./user-get-all";
import { UserInfrastructure } from "./user-infrastructure";
import { UserRepository } from "./user.interface";

const userProperties: UserProperties = {
  name: "Julio",
  lastname: "Salinas",
  email: "julio@example.com",
  age: 25,
  password: "12345",
};

const user = new User(userProperties);

const repository: UserRepository = new UserInfrastructure();
const userCreate = new UserCreate(repository);
userCreate.run(user).then((user) => {
  const userGetAll = new UserGetAll(repository);
  userGetAll.run().then((users) => console.log("Users", users));
});
