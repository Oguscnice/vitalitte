import { Role } from "./Role";

export interface NewUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface UserSignin {
  email: string;
  password: string;
}

export interface UserLogIn {
  email: string;
  role: Role[];
  token: string;
}