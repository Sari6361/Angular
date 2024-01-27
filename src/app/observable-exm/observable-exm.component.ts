import { Component, Input, OnInit } from '@angular/core';
import { Observable, interval, map, filter, from } from 'rxjs';
import { Student } from '../Entities/student.model';
import { STUDENTS } from '../student.service';

@Component({
  selector: 'app-observable-exm',
  templateUrl: './observable-wxmple.component.html'
})
export class ObservableExmpleComponent implements OnInit {

  students: Observable<string> = new Observable((o) => {
    let i = 0;
    for (; i < STUDENTS.length; i++)
      o.next(STUDENTS[i].id + ": " + STUDENTS[i].name)
  })
  studesnts_: any[] = [];
  students2: Observable<string> = from(this.studesnts_).pipe(map(x => x.name))

  timer?: string;

  timer1: Observable<Date> = new Observable((o => {
    setInterval(() => {
      o.next(new Date());
    }, 1000)
  }));

  timer2: Observable<Date> = interval(1000).pipe(map(timer => new Date()));
  @Input()
  name: String;

  students_names: String[];
  source: Observable<String> = new Observable((observer) => {
    if (this.name) {
      observer.next(this.name);
      this.name = null;
    }
  })

  send1: Observable<Student> = new Observable(x => {
    let i = 0;
    for (; i < STUDENTS.length; i++)
      if (STUDENTS[i].active)
        x.next(STUDENTS[i]);
  })

  sendEmail1() {
    this.send1.subscribe(v => {
      alert("email successfully sent to " + v.name);
    })
  }
  
  send_students: any[] = [];
  send2: Observable<Student> = from(this.send_students);
  sendEmail2() {
    this.send2.pipe(filter(x => x.active),
      map(x => "email successfully sent to " + x.name)).subscribe(x => {
        alert(x);
      })
  }


  constructor() {

    this.students.subscribe(x => {
      console.log('next:', x)
    });

    // this.students2.pipe(map(x => x.name)).subscribe(x => console.log("s", x));


    this.source.subscribe((val) => {
      this.students_names.push(val);
    });

    this.timer2.subscribe(x =>
      this.timer = x.toLocaleTimeString());
  }
  ngOnInit(): void {
  }

}
