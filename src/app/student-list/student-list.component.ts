import { Component, EventEmitter, Output, numberAttribute } from '@angular/core';
import { Student } from '../Entities/student.model';
import { studentService } from '../student.service';

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
    console.log(index_to_delete);

    this.students.splice(index_to_delete, 1);
  }

  showAdd() {
    this.student = new Student();
    this.student.active = true;
  }

  show(student: Student) {

    this.onSelectStudent.emit(student);
    var x;
    // = this._studentService.sumAbsentDaysById(this.student.id);
    this.absentDays = numberAttribute(x);
    this.student = student;
  }

  async getAbsentService(id: number) {
    await this._studentService.sumAbsentDaysById(id).then(data => {
      return data;
    }).catch(() => {
      console.log();
    });
  }

  save(student: Student) {
    let s = this.students.findIndex(s => s.id == student.id)
    if (s != -1)
      this.students[s] = student;
    else {
      student.id = this.students.length + 1;
      this.students.push(student);
    }
    this.student = null;
    this.absentDays = 0;
  }

  ShowMsgSecuss(student: Student) {
    alert(`הוספת בהצלחה את ` + student.name)
  }

  //observable
  name: String;
  sendName(name: String) {
    this.name = name;
  }
  sowStudentsActive() {

  }
  constructor(private _studentService: studentService) {

  }
  ngOnInit(): void {
    // this._studentService.getStudentSlowly().then((data)=>{
    //   this.students = data
    // this.students.map((s)=>{this._studentService.sumAbsentDaysById(s.id).then((res)=>{s['absent'] = res})})
    // })    
    this._studentService.getStudentsFromServer().subscribe((data) => {
      this.students = data;
      console.log(data);
      this.students.map((s) => { this._studentService.sumAbsentDaysById(s.id).then((res) => { s['absent'] = res }) })
    })
  }

}
