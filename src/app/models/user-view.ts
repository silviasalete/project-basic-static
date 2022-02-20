import { Role } from "./decode";

export interface UserView {
    id: number;
    name: string;
    email: string;
    password: string;
    company: string;
    roles: Role[];
}
