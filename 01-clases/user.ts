interface UserEssentials {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

interface UserOptionals {
  id: number;
  age: number;
  gender: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

// interface UserProperties extends UserEssentials, Partial<UserOptionals> {}
export type UserProperties = UserEssentials & Partial<UserOptionals>;

// Modelo de dominio
export class User {
  private readonly id: number;
  private name: string;
  private lastname: string;
  private email: string;
  private age?: number;
  private gender?: string;
  private password: string;
  private readonly createdAt: Date;
  private updatedAt?: Date;
  private deletedAt?: Date;

  constructor(
    properties: UserProperties
    /*id: number,
    name: string,
    lastname: string,
    email: string,
    age: number,
    gender: string,
    password: string*/
  ) {
    if (properties.id) {
      this.id = properties.id;
    } else {
      this.id = new Date().getTime();
    }

    if (!properties.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
      throw new Error("Invalid email");

    if (properties.age && (properties.age < 18 || properties.age > 120))
      throw new Error("Invalid age");

    if (
      properties.gender &&
      properties.gender !== "male" &&
      properties.gender !== "female"
    )
      throw new Error("Gender must be 'male' or 'female'");

    //this.id = properties.id;
    this.name = properties.name;
    this.lastname = properties.lastname;
    this.email = properties.email;
    this.age = properties.age;
    this.gender = properties.gender;
    this.password = properties.password;

    if (properties.createdAt) {
      this.createdAt = properties.createdAt;
    } else {
      this.createdAt = new Date();
    }

    if (properties.updatedAt) this.updatedAt = properties.updatedAt;
    if (properties.deletedAt) this.deletedAt = properties.deletedAt;
    console.log("User created");
  }

  properties() {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      age: this.age,
      gender: this.gender,
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(age: number) {
    if (age < 18 || age > 120) throw new Error("Invalid age");
    this.age = age;
    this.updatedAt = new Date();
  }

  delete() {
    this.deletedAt = new Date();
  }
}

/* const userProperties: UserProperties = {
  name: "Carlos",
  lastname: "Rodríguez",
  email: "carlos@email.com",
  //age: 35,
  //gender: "male",
  password: "12345",
};

const user = new User(userProperties); */

/*const user = new User(
  10,
  "Carlos",
  "Rodríguez",
  "carlos@email.com",
  35,
  "12345",
  "male",
);*/

/* console.log("create", user.properties());
user.update(52);
console.log("update", user.properties());
user.delete();
console.log("delete", user.properties()); */

//user.email = "cualquiercosa.xxx";
//console.log("email", user.email);
//console.log("password", user.password);
//user.id = 20;
//console.log(user);
