import { CourseStudy } from "./CourseStudy.model";
import { Year } from "./Enum.model";
import { Exam } from "./Exam.model";
import { Obsence } from "./Obsence.model";

export class Student {
    id: number;
    name: String;
    adress: String;
    phone_number: String;
    active: boolean;
    avg_marks: number;
    living: number;
    course_id: CourseStudy;
    year: Year;
    departureDate:Date;
    exams: Exam[];
    obsenceDays:Obsence[];

}