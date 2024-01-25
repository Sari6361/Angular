import { Component, EventEmitter, Output, numberAttribute } from '@angular/core';
import { Student } from '../Entities/student.model';
import { studentService } from '../student.service';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent {

  student: Student;
  students: Student[];
  absentDays: number;

  @Output()
  onSelectStudent: EventEmitter<Student> = new EventEmitter();

  DeleteStudent(student: Student) {
    let index_to_delete = this.students.findIndex(s => s.id == student.id);
    this.students.splice(index_to_delete, 1);
  }

  showAdd() {
    this.student = new Student();
    this.student.active=true;
  }

    show(student: Student) {
    this.onSelectStudent.emit(student);
    var x = this._studentService.sumAbsentDaysById(this.student.id);
    this.absentDays = numberAttribute(x);
    this.student = student;
  }

   getAbsentService(id: number) {
    console.log("student",this.student)
    var x =  this._studentService.sumAbsentDaysById(this.student.id);
    this.absentDays =numberAttribute(x);
  }

  save(student: Student) {
    let s = this.students.findIndex(s => s.id == student.id)
    if (s)
      this.students.slice(s, 1);
    student.id = this.students.length + 1;
    this.students.push(student);
    this.student = null;
    this.absentDays = 0;
  }

  ShowMsgSecuss(student: Student) {
    alert(`הוספת בהצלחה את ` + student.name)
  }


  //observable
name:String;
  sendName(name:String)
  {
    this.name=name;
  }




  constructor(private _studentService: studentService) {

  }
  ngOnInit(): void {
    this._studentService.getStudentSlowly().then(data => {
      this.students = data;
    });
  }

}
