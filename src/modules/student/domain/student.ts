interface StudentEssentials {
  name: string;
  lastname: string;
  age: number;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  gender: string;
  career: string;
  semester: number;
}

interface StudentOptionals {
  createdAt: Date;
  updated: Date;
  deletedAt: Date;
  id: number;
}

export type StudentProperties = StudentEssentials & Partial<StudentOptionals>;

export class Student {
  private readonly id: number | undefined;
  private name: string;
  private lastname: string;
  private age: number;
  private email: string;
  private phone: string;
  private address: string;
  private city: string;
  private country: string;
  private gender: string;
  private career: string;
  private semester: number;
  private readonly createdAt: Date;
  private updatedAt: Date | undefined;
  private deletedAt: Date | undefined;

  constructor(props: StudentProperties) {
    const regExp = new RegExp(
      /^([\w.-]+)@(\[(\d{1,3}\.){3}|(?!hotmail|gmail|googlemail|yahoo|gmx|ymail|outlook|bluewin|protonmail|t\-online|web\.|online\.|aol\.|live\.)(([a-zA-Z\d-]+\.)+))([a-zA-Z]{2,63}|\d{1,3})(\]?)$/
    );

    if (!regExp.test(props.email)) {
      throw new Error("Invalid email");
    }

    if (props.address.length < 5) throw new Error("Invalid address");

    if (props.city.length < 3) throw new Error("Invalid city");

    if (props.country.length < 3) throw new Error("Invalid country");

    if (
      !props.career.trim().toLowerCase().includes("ingenieria") &&
      !props.career.trim().toLowerCase().includes("ing")
    )
      throw new Error("Invalid career");

    /* this.name = props.name;
    this.lastname = props.lastname;
    this.age = props.age;
    this.email = props.email;
    this.phone = props.phone;
    this.address = props.address;
    this.city = props.city;
    this.country = props.country;
    this.gender = props.gender;
    this.career = props.career;
    this.semester = props.semester; */

    Object.assign(this, props);

    if (props.id && props.id > 0) {
      this.id = props.id;
    } else if (props.id && props.id <= 0) {
      throw new Error("Invalid id");
    }

    if (!props.id) {
      this.id = Math.floor(Math.random() * 1000);
    }

    if (props.createdAt) {
      this.createdAt = createdAt;
    } else {
      this.createdAt = new Date();
    }
    if (props.updated) this.updatedAt = props.updated;
    if (props.deletedAt) this.deletedAt = props.deletedAt;
  }

  get properties() {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      age: this.age,
      email: this.email,
      phone: this.phone,
      address: this.address,
      city: this.city,
      country: this.country,
      gender: this.gender,
      career: this.career,
      semester: this.semester,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(name: string) {
    this.name = name;
    this.updatedAt = new Date();
  }
}

const props: StudentProperties = {
  name: "John",
  lastname: "Doe",
  age: 20,
  email: "john.doe@email.com",
  phone: "123456789",
  address: "123 Main St",
  city: "SpringField",
  country: "USA",
  gender: "male",
  career: "Computer Science",
  semester: 1,
  createdAt: new Date(),
};

const student = new Student(props);
