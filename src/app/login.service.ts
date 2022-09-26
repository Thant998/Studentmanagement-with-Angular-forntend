import { Injectable } from '@angular/core';
import {UserService} from "./user.service";
import {ActivatedRoute, Router} from "@angular/router";
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  user: User = new User();
  constructor(private userService: UserService,private route: ActivatedRoute,private router: Router) { }

  loginUser(userId: string, password: string) {
      this.userService.getUserById(userId).subscribe(data => {
      this.user = data;
    }, error => console.log(error));
    if (userId === this.user.id && password === this.user.password) {
      sessionStorage.setItem('userId', userId)
      return true;
    } else {
      return false;
    }
  }

  logoutUser() {
    sessionStorage.removeItem('userId')
  }

}