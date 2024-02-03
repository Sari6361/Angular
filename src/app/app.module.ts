import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HistoryExamsComponent } from './history-exams/history-exams.component'
import { studentService } from './student.service';
import { ObservableExmpleComponent } from './observable-exm/observable-exm.component';


@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    StudentDetailsComponent,
    HistoryExamsComponent,
    ObservableExmpleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [studentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
