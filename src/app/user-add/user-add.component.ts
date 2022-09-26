import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})

export class UserAddComponent implements OnInit {
  id=sessionStorage.getItem("userId")
  date = new Date().toDateString();
  user: User = new User();
  userForm:FormGroup
  constructor(private userService: UserService,private builder: FormBuilder,private router: Router) { 

    this.userForm = this.builder.group({
      id : ['',Validators.required],
      name: ['', Validators.required ],
      email : ['',Validators.required],
      password : ['',Validators.required],
      role : ['',Validators.required],
    })
  }

  ngOnInit(): void { }

  goToUserList(){
    this.router.navigate(['/user']);
  }

  saveUser(){
    this.userService.createUser(this.user).subscribe(data =>{
        console.log(data);
        this.goToUserList();});
  }

  onSubmit() {
    //if (this.user.name === "" ||  this.user.email === "" ||  this.user.password === "" ||  this.user.role === "") {
      //alert("Fail Register")
      //this.router.navigate(['/user-add']);
      //} else {
        alert("Successfully")
      this.saveUser();
    //}
  }

}