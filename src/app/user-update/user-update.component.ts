import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})

export class UserUpdateComponent implements OnInit {
  userid=sessionStorage.getItem("userId")
  date = new Date().toDateString();
  id: String 
  user: User = new User();
  constructor(private userService: UserService,private route: ActivatedRoute,private router: Router) { 
    this.id=''
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe(data => {
      this.user = data;
    }, error => console.log(error));
  }

  goToUserList(){
    this.router.navigate(['/user']);
  }

  onSubmit(){
    if(this.user.name ===""||  this.user.email==="" ||  this.user.password===""||  this.user.role===""  ){
      }else {
          this.userService.updateUser(this.id, this.user).subscribe(data => {
           this.goToUserList();},error => console.log(error));
    }
  }
}