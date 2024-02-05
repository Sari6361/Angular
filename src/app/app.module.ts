import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { StudentModule } from './modules/students-module/students.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './modules/setting/account/account.component';
import { FavoritesComponent } from './modules/setting/favorites/favorites.component';
import { LoginComponent } from './modules/setting/login/login.component';
import { ProfileComponent } from './modules/setting/profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ObservableModule } from './modules/observable/observable.module';
import { SettingModule } from './modules/setting/setting.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    FavoritesComponent,
    LoginComponent,
    ProfileComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StudentModule,
    ObservableModule,
    SettingModule,
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
