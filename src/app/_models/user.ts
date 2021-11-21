import { Role } from "./role";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    role: Role;
    token?: string;

}
