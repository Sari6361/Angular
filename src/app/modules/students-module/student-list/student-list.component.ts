import { Component, EventEmitter, Output, numberAttribute } from '@angular/core';
import { Student } from '../../../Entities/student.model';
import { studentService } from '../../../student.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

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
    }).catch((err) => {
      console.log(err);
    });
  }

  save(student: Student) {
    let s = this.students.findIndex(s => s.id == student.id)
    if (s != -1) {
      // this.students[s] = student;
      this._studentService.updateStudentInServer(student).subscribe((data) => {
        if (data)
          this.getStudents();
      }, (err) => console.log(err))
    }
    else {
      student.id = this.students.length + 1;
      this.saveStudentToServer();
      this.students.push(student);
    }
    this.student = null;
    this.absentDays = 0;
  }

  getStudents() {
    this._studentService.getStudentsFromServer().subscribe((data) => {
      this.students = data;
    })
  }
  ShowMsgSecuss(student: Student) {
    alert(`הוספת בהצלחה את ` + student.name)
  }


  //observable
  name: String;
  sendName(name: String) {
    this.name = name;
  }

  constructor(private _studentService: studentService) {
   
  }

  showActiveStudents(active: boolean) {
    this._studentService.getActiveStudentsFromServer(active).subscribe((data) => {
      this.students = data;
      this.students.map((s) => { this._studentService.sumAbsentDaysById(s.id).then((res) => { s['absent'] = res }) })
    })
  }

  saveStudentToServer() {
    this._studentService.saveStudentsToServer(this.students).subscribe((data) => {
      if (data)
        alert("SAVE SUCCESS!");
      else
        alert("SAVE FAILED:(")
    }, (err) => console.log(err));
  }

  deleteStudent() {
    this._studentService.deleteStudent(this.student.id).subscribe((data) => {
      if (data)
        this.getStudents();
    }, err => console.log(err.response))
  }

  nameToSearch:string='';
  private searchTerms=new Subject<string>();
  search():void{
    this.searchTerms.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(()=>this._studentService.getStudentByName(this.nameToSearch)),
    ).subscribe(data=>this.students=data);
  }

  getStudentsByName():void{
    this.searchTerms.next(this.nameToSearch);
  }
  ngOnInit(): void {
    this._studentService.getStudentsFromServer().subscribe((data) => {
      this.students = data;
      this.students.map((s) => { this._studentService.sumAbsentDaysById(s.id).then((res) => { s['absent'] = res }) })
    })
    // this._studentService.getStudentSlowly().then((data)=>{
    //   this.students = data
    // this.students.map((s)=>{this._studentService.sumAbsentDaysById(s.id).then((res)=>{s['absent'] = res})})
    // })    

  }

}
