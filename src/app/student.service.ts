import { Injectable } from "@angular/core";
import { Student } from "./Entities/student.model";
import { Year } from "./Entities/Enum.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
export const STUDENTS: Student[] = [
    {
        id: 1, name: "Yosef Choen", adress: "Rashi", departureDate: new Date(10, 12, 2222), phone_number: "0556766361", active: false, avg_marks: 98, living: 8,
        course_id: { id: 1, courseName: "Thichnut", courseTeacher: "prag" }, year: Year.YearB, obsenceDays: [{ startObsence: new Date(2023, 9, 13), countObsencesDays: 10 }, { startObsence: new Date(2023, 12, 13), countObsencesDays: 3 }, { startObsence: new Date(12, 12, 2022), countObsencesDays: 12 }],
        exams:
            [{ id: 1, date: new Date(2023, 6, 12), mark: 100, description: "English" },
            { id: 2, date: new Date(2023, 7, 12), mark: 88, description: "Math" },
            { id: 3, date: new Date(2023, 8, 12), mark: 10, description: "Since" },
            { id: 4, date: new Date(2023, 9, 12), mark: 75, description: "C" },
            ]
    },
    {
        id: 2, departureDate: new Date(1, 2, 2022), name: "Chaim Levi", adress: "Sher", phone_number: "0512345678", active: true, avg_marks: 75, living: 2,
        course_id: { id: 1, courseName: "Thichnut", courseTeacher: "prag" }, year: Year.YearB, obsenceDays: [{ startObsence: new Date(2, 2, 2022), countObsencesDays: 12 }, { startObsence: new Date(2023, 12, 13), countObsencesDays: 3 }, { startObsence: new Date(12, 12, 2022), countObsencesDays: 12 }],
        exams:
            [{ id: 5, date: new Date(2023, 8, 12), mark: 40, description: "Html" },
            { id: 6, date: new Date(2023, 9, 12), mark: 80, description: "Math" },
            { id: 7, date: new Date(2023, 10, 12), mark: 80, description: "Since" },
            { id: 8, date: new Date(2023, 11, 12), mark: 65, description: "C" },
            ]
    },
    {
        id: 3, name: "Beni Katz", adress: "Maimon", phone_number: "0556766013", active: false, avg_marks: 50, living: 1,
        course_id: { id: 1, courseName: "Thichnut", courseTeacher: "prag" }, year: Year.YearA, departureDate: new Date(2, 2, 2022), obsenceDays: [{ startObsence: new Date(2, 2, 2022), countObsencesDays: 12 }],
        exams:
            [{ id: 9, date: new Date(2023, 6, 12), mark: 3, description: "Verifction" },
            { id: 10, date: new Date(2023, 7, 12), mark: 88, description: "Math" },
            { id: 11, date: new Date(2023, 8, 12), mark: 10, description: "Since" },
            { id: 12, date: new Date(2023, 9, 12), mark: 75, description: "C#" },
            ]
    },
    {
        id: 4, name: "Dani Man", adress: "Rambam", phone_number: "0548406181", active: true, avg_marks: 67, living: 1,
        course_id: { id: 1, courseName: "Thichnut", courseTeacher: "prag" }, year: Year.YearA, departureDate: new Date(2, 2, 2022), obsenceDays: [{ startObsence: new Date(2, 2, 2022), countObsencesDays: 12 }],
        exams:
            [{ id: 9, date: new Date(2023, 6, 12), mark: 3, description: "Verifction" },
            { id: 10, date: new Date(2023, 7, 12), mark: 88, description: "Math" },
            ]
    },
    {
        id: 5, name: "Meir Shtz", adress: "Eliezer", phone_number: "0527618968", active: false,
        avg_marks: 67, living: 1, course_id: { id: 1, courseName: "Thichnut", courseTeacher: "prag" }, year: Year.YearA, departureDate: new Date(2, 2, 2022), obsenceDays: [{ startObsence: new Date(2, 2, 2022), countObsencesDays: 12 }],
        exams:
            [{ id: 9, date: new Date(2023, 6, 12), mark: 3, description: "Verifction" },
            { id: 10, date: new Date(2023, 7, 12), mark: 88, description: "Math" },
            ]
    },
];

@Injectable()
export class studentService {
    getStudents(): Student[] {
        return STUDENTS;
    };

    getStudentSlowly(): Promise<Student[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(STUDENTS);
            }, 100);
        })
    }

    getStudentAvgById(id: number): Promise<number> {
        var student = STUDENTS.find(s => s.id == id);
        return new Promise((res, rej) => {
            var avg: number = 0;
            student?.exams?.forEach(s => avg += s.mark);
            avg /= (student?.exams?.length);
            res(avg);
        });
    }

    sumAbsentDaysById(id: number): Promise<number> {
        var student: Student = STUDENTS.find(s => s.id === id);
        return new Promise(res => {
            var sum: number = 0;
            student?.obsenceDays?.forEach(s => sum += s.countObsencesDays);
            // console.log("student:",student,"absence sum:",sum)
            res(sum);
        });
    }
    //Server
    getStudentsFromServer(): Observable<Student[]> {
        return this._http.get<Student[]>(`api/Studens`);
    }

    getActiveStudentsFromServer(active: boolean): Observable<Student[]> {
        return this._http.get<Student[]>(`api/Students/?active=` + active);
    }

    getStudentByName(name: string) {
        if (name == '')
            return this.getStudentsFromServer();
        return this._http.get<Student[]>(`api/Students/name=` + name);
    }

    saveStudentsToServer(students: Student[]): Observable<boolean> {
        return this._http.post<boolean>(`api/Students`, students);
    }

    updateStudentInServer(student: Student): Observable<boolean> {
        return this._http.put<boolean>(`api/Students/${student.id}`, student);
    }
    
    addStudentServer(student: Student): Observable<boolean> {
        return this._http.post<boolean>(`api/Students`, student);
    }

    deleteStudent(id: number): Observable<boolean> {
        return this._http.delete<boolean>(`api/Students/${id}`)
    }

    constructor(private _http: HttpClient) {

    }
    ngOnInit(): void {
    }

}