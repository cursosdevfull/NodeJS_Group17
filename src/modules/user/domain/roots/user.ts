import { v4 as uuidv4 } from "uuid";

export interface UserRequired {
  name: string;
  lastname: string;
  email: string;
  password: string;
  roles: any[];
}

export interface UserOptional {
  userId: string;
  refreshToken: string;
  secret: string;
  image: string;
  createdAt: Date;
  updatedAt: Date | undefined;
  deletedAt: Date | undefined;
}

export type UserProperties = UserRequired & Partial<UserOptional>;
export type UserPropertiesToUpdate = Partial<
  Omit<UserRequired, "email"> &
    Pick<UserOptional, "refreshToken" | "secret" | "image">
>;

export class User {
  private readonly userId: string;
  private name: string;
  private lastname: string;
  private readonly email: string;
  private password: string;
  private roles: any[];
  private refreshToken: string;
  private secret: string;
  private image: string;
  private readonly createdAt: Date;
  private updatedAt: Date | undefined;
  private deletedAt: Date | undefined;

  constructor(props: UserProperties) {
    Object.assign(this, props);
    if (!props.createdAt) this.createdAt = new Date();
    if (!props.refreshToken) this.refreshToken = uuidv4();
  }

  get properties() {
    return {
      userId: this.userId,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      roles: this.roles,
      refreshToken: this.refreshToken,
      secret: this.secret,
      image: this.image,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(props: UserPropertiesToUpdate) {
    Object.assign(this, props);
    this.updatedAt = new Date();
  }

  delete() {
    this.deletedAt = new Date();
  }
}
