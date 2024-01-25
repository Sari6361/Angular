import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../Entities/student.model';
import { APP_COURSES, CourseStudy } from '../Entities/CourseStudy.model';
import { Year } from '../Entities/Enum.model';
import { Exam } from '../Entities/Exam.model';
import { Obsence } from '../Entities/Obsence.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})

export class StudentDetailsComponent {

  Courses: CourseStudy[] = APP_COURSES;
  yearType = Year;

  obsenceDate?: Date;
  obsenceCount: number = 0;

  @Input()
  missedDays:number;

  //כאשר נבחר תלמיד להוספה או לעידכון נצייר את הטופס
  private _student?: Student;

  public get student(): Student | undefined {
    return this._student;
  }

  @Input()
  public set student(value: Student | undefined) {
    this._student = value;
    if (this.student != undefined)
      this.StudentForm = new FormGroup({
        "id": new FormControl(),
        "name": new FormControl(this.student.name, [Validators.required, Validators.minLength(5)]),
        "adress": new FormControl(this.student.adress, Validators.required),
        "phone_number": new FormControl(this.student.phone_number, Validators.maxLength(10)),
        "avg_marks": new FormControl(this.student.avg_marks),
        "living": new FormControl(this.student.living, Validators.required),
        "course_id": new FormControl(this.student.course_id),
        "year": new FormControl(this.student.year),
        "active": new FormControl(this.student.active),
      });
  }
  //כאשר לוחצים על כפתור שמירה נעורר ארוע שיעודכן בקומפוננטה שמחזיקה את רשימת הסטודנטים ונשלח לו את התלמיד החדש
  @Output()
  onSaveNewStudent: EventEmitter<Student> = new EventEmitter();
  //לאחר השמירה נעורר ארוע כדי להדפיס הודעה למסך
  @Output()
  afterAdding: EventEmitter<Student> = new EventEmitter();
 
  @Output()
  addName:EventEmitter<String>=new EventEmitter();

  //אובייקט שמייצג את הטופס
  StudentForm: FormGroup = new FormGroup({});

  save() {
    this.student = this.StudentForm.value;
    if (this.obsenceCount && this.obsenceDate) {
      let absent: Obsence = { startObsence: this.obsenceDate, countObsencesDays: this.obsenceCount };
      this.student?.obsenceDays?.push(absent);
    }
    this.onSaveNewStudent.emit(this.student);
    this.afterAdding.emit(this.student);
    this.addName.emit(this.student.name);
  }


}
