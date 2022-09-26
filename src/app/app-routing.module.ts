
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {LogoutComponent} from "./logout/logout.component";
import {MenuComponent} from "./menu/menu.component";
import { UserAddComponent } from "./user-add/user-add.component";
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { CourseComponent } from './course/course.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentAddComponent } from './student-add/student-add.component';
import { StudentUpdateComponent } from './student-update/student-update.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'logout', component: LogoutComponent},

  {path: 'menu', component: MenuComponent},

  {path: 'user-add', component: UserAddComponent},
  {path: 'user-update/:id', component: UserUpdateComponent},
  {path: 'user', component: UserListComponent},

  {path:'course',component:CourseComponent},
  
  {path:'student-add',component:StudentAddComponent},
  {path:'student',component:StudentListComponent},
  {path:'student-update/:id',component:StudentUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
