import { Component, Input } from '@angular/core';
import { Exam } from '../../../Entities/Exam.model';
import { Student } from '../../../Entities/student.model';
import { studentService } from '../../../student.service';

@Component({
  selector: 'app-history-exams',
  templateUrl: './history-exams.component.html',
  styleUrls: ['./history-exams.component.scss']
})
export class HistoryExamsComponent {
  //מקבלת את התלמיד אותו היא רוצה להציג דרך ה-app
  @Input()
  student: Student;

  avg?: number;
  constructor(private _studentService: studentService) { }
  ngOnInit() {
    this._studentService.getStudentAvgById(this.student.id).then(data => {
      this.avg = data;
    });
  }
}
