import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  userid = "";
  password = "";
  invalidLogin = false

  constructor(private router: Router,private loginservice: LoginService) { }

  ngOnInit() { }

  login(id:string,pwd:string) {
    console.log(this.userid)
    console.log(this.password)
    if (!this.loginservice.loginUser(id, pwd)) {
       this.invalidLogin = true
       alert("login failed")
    } else {
      this.router.navigate(['/menu'])
      this.invalidLogin = false
    }
  }
}