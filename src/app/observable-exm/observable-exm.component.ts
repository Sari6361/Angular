import { Component, Input, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
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

  students2: Observable<Student> = new Observable((o) => {
    let i = 0;
    for (; i < STUDENTS.length; i++)
      o.next(/*STUDENTS[i]*/);
  })
  
  timer?: string;

  timer1: Observable<Date> = new Observable((o) => {
    setInterval(() => {
      o.next(new Date);
    }, 1000)
  });

  // timer2: Observable<Date>=interval(1000).pipe(map(timer=>new Date()));
  // @Input()
  // name: String;

  // students_names: String[];
  // source: Observable<String> = new Observable((observer) => {
  //   if (this.name) {
  //     observer.next(this.name);
  //     this.name = null;
  //   }
  // })

  constructor() {
    // this.source.subscribe((val) => {
    //   this.students_names.push(val);
    // });
  }
  ngOnInit(): void {
  }

}
