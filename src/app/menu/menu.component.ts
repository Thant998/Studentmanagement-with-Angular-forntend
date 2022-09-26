import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  constructor(public loginService: LoginService) { }

  id=sessionStorage.getItem("userId")
  date = new Date().toDateString();

  ngOnInit(): void { }

}