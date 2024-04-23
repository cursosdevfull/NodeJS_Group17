import { User } from "./user";
import { UserData } from "./user-data";
import { UserRepository } from "./user.interface";

function addDays(date: Date, days: number) {
  return new Date(date.setDate(date.getDate() + days));
}

const usersData: UserData[] = [
  new UserData({
    id: 1,
    name: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    age: 30,
    gender: "male",
    password: "123",
    createdAt: new Date(),
    updatedAt: addDays(new Date(), 1),
  }),
  new UserData({
    id: 2,
    name: "Juan",
    lastname: "Roca",
    email: "juan.roca@example.com",
    age: 25,
    gender: "male",
    password: "12345",
    createdAt: new Date(),
    updatedAt: addDays(new Date(), 1),
  }),
  new UserData({
    id: 3,
    name: "Carlos",
    lastname: "Saldaña",
    email: "carlos@example.com",
    age: 25,
    gender: "male",
    password: "123456",
    createdAt: new Date(),
  }),
  new UserData({
    id: 4,
    name: "Augusto",
    lastname: "Rodríguez",
    email: "augusto@example.com",
    age: 40,
    gender: "male",
    password: "1233333",
    createdAt: new Date(),
  }),
  new UserData({
    id: 5,
    name: "Elder",
    lastname: "Carbajal",
    email: "elder@example.com",
    age: 30,
    gender: "male",
    password: "1234444",
    createdAt: new Date(),
    updatedAt: addDays(new Date(), 1),
    deletedAt: addDays(new Date(), 2),
  }),
];

export class UserInfrastructure implements UserRepository {
  async insert(user: User): Promise<User> {
    return await this.add(user);
  }

  async add(user: User): Promise<User> {
    const userData = new UserData({
      id: user.properties().id,
      name: user.properties().name,
      lastname: user.properties().lastname,
      email: user.properties().email,
      age: user.properties().age,
      gender: user.properties().gender,
      password: user.properties().password,
      createdAt: user.properties().createdAt,
      updatedAt: user.properties().updatedAt,
      deletedAt: user.properties().deletedAt,
    });

    usersData.push(userData);

    return Promise.resolve(user);
  }

  async getAll(): Promise<User[]> {
    const users = usersData.map(
      (userData) =>
        new User({
          id: userData.id,
          name: userData.name,
          lastname: userData.lastname,
          email: userData.email,
          age: userData.age,
          gender: userData.gender,
          password: userData.password,
          createdAt: userData.createdAt,
          updatedAt: userData.updatedAt,
          deletedAt: userData.deletedAt,
        })
    );

    return Promise.resolve(users);
  }

  async findUserByEmail(email: string): Promise<boolean> {
    const userData = usersData.find((user) => user.email === email);

    if (!userData) return Promise.resolve(false);

    return Promise.resolve(true);
  }
}
