import { Course } from "./Course";

export class Student {

    id! : string;
    name!: string;
    dob!: string;
    gender!: string;
    phone!: string;
    education!: string;
    courses!: Course[];
}