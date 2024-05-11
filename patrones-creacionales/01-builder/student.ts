export class Student {
  id: number;
  name: string;
  lastname: string;
  age: number;
  email: string;
  gender: string;
  address: string;
  phone: string;
  coursesEnrolled: string[];
  coursesFinished: string[];
  coursesInProgress: string[];

  constructor(props: {
    id: number;
    name: string;
    lastname: string;
    age: number;
    email: string;
    gender: string;
    address: string;
    phone: string;
    coursesEnrolled: string[];
    coursesFinished: string[];
    coursesInProgress: string[];
  }) {
    this.id = props.id;
    this.name = props.name;
    this.lastname = props.lastname;
    this.age = props.age;
    this.email = props.email;
    this.gender = props.gender;
    this.address = props.address;
    this.phone = props.phone;
    this.coursesEnrolled = props.coursesEnrolled;
    this.coursesFinished = props.coursesFinished;
    this.coursesInProgress = props.coursesInProgress;
  }
}
