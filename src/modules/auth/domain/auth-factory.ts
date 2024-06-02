import { Auth } from './auth';

export class AuthFactory {
  static create(email: string, password: string) {
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      throw new Error("Invalid email");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    return new Auth(email, password);
  }
}
