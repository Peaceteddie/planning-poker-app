import { User } from "./user.class";

export interface Message {
    type: string;
    user?: User;
    users?: User[];
}