import { v4 as uuidv4, validate } from "uuid";

import { User, UserProperties } from "./user";

export class UserFactory {
  static create(props: UserProperties): User {
    if (props.userId && !validate(props.userId)) {
      throw new Error("Invalid UUID");
    }

    if (
      props.email &&
      !props.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)
    ) {
      throw new Error("Invalid email");
    }

    if (props.name && props.name.length < 3) {
      throw new Error("Name too short");
    }

    if (props.lastname && props.lastname.length < 3) {
      throw new Error("Lastname too short");
    }

    if (props.password && props.password.length < 8) {
      throw new Error("Password too short");
    }

    if (props.roles && props.roles.length === 0) {
      throw new Error("Roles cannot be empty");
    }

    if (!props.userId) props.userId = uuidv4();

    return new User(props);
  }
}
