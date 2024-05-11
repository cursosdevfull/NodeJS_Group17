import { Student } from "./student";

export class StudentBuilder {
  private id: number;
  private name: string;
  private lastname: string;
  private age: number;
  private email: string;
  private gender: string;
  private address: string;
  private phone: string;
  private coursesEnrolled: string[] = [];
  private coursesFinished: string[] = [];
  private coursesInProgress: string[] = [];

  addId(id: number): StudentBuilder {
    this.id = id;
    return this;
  }

  addName(name: string): StudentBuilder {
    this.name = name;
    return this;
  }

  addLastname(lastname: string): StudentBuilder {
    this.lastname = lastname;
    return this;
  }

  addAge(age: number): StudentBuilder {
    this.age = age;
    return this;
  }

  addEmail(email: string): StudentBuilder {
    this.email = email;
    return this;
  }

  addGender(gender: string): StudentBuilder {
    this.gender = gender;
    return this;
  }

  addAddress(address: string): StudentBuilder {
    this.address = address;
    return this;
  }

  addPhone(phone: string): StudentBuilder {
    this.phone = phone;
    return this;
  }

  addCoursesEnrolled(coursesEnrolled: string[]): StudentBuilder {
    this.coursesEnrolled = coursesEnrolled;
    return this;
  }

  addCoursesFinished(coursesFinished: string[]): StudentBuilder {
    this.coursesFinished = coursesFinished;
    return this;
  }

  addCoursesInProgress(coursesInProgress: string[]): StudentBuilder {
    this.coursesInProgress = coursesInProgress;
    return this;
  }

  private get properties() {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      age: this.age,
      email: this.email,
      gender: this.gender,
      address: this.address,
      phone: this.phone,
      coursesEnrolled: this.coursesEnrolled,
      coursesFinished: this.coursesFinished,
      coursesInProgress: this.coursesInProgress,
    };
  }

  build(): Student {
    return new Student(this.properties);
  }
}
