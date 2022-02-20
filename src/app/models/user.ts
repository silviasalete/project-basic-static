import { Role } from "./decode";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  company: number;
  roles: Role[];
}
