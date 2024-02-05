import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HistoryExamsComponent } from "src/app/modules/students-module/history-exams/history-exams.component";
import { StudentDetailsComponent } from "src/app/modules/students-module/student-details/student-details.component";
import { StudentListComponent } from "src/app/modules/students-module/student-list/student-list.component";
import { studentService } from "src/app/student.service";
import { ObservableExmpleComponent } from "../observable/observable-exm/observable-exm.component";

@NgModule({
    declarations: [StudentListComponent, StudentDetailsComponent, HistoryExamsComponent],
    imports: [CommonModule,ReactiveFormsModule,FormsModule,HttpClientModule],
    providers: [studentService],
    exports:[StudentListComponent,HistoryExamsComponent]
})
export class StudentModule {

}