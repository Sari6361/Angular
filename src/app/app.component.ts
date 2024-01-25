import { Component } from '@angular/core';
import { Student } from './Entities/student.model';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent {
   title = 'students-app by sari-a';

   calc_time() {
      let d: Date = new Date();
      let houers = d.getHours();
      let blessing: string;
      if (houers < 14)
         blessing = `now time ${d.getHours()}: ${d.getMinutes()} Good Morning!!`;
      else if (houers < 18)
         blessing = `now time ${d.getHours()}: ${d.getMinutes()} Good After-noon!!`;
      else
         blessing = `now time ${d.getHours()}: ${d.getMinutes()} Good Evning!!`;
      return blessing;
   }

   student?: Student;
   
   chooseStudent(s: Student) {
      this.student = s;
      console.log(this.student);
   }
}
