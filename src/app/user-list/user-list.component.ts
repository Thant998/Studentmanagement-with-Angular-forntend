import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import * as XLSX from "xlsx";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  userid=sessionStorage.getItem("userId")
  search:User=new User();
  searchid:any;
  searchname:any;
  date = new Date().toDateString();
  users:User[];
  id: string;
  fileName= 'User-Excel.xlsx';
  constructor(private userService: UserService,private router: Router) {
    this.users=[];
    this.id=''
  }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser() {
    this.userService.getUserList().subscribe(data => {
      this.users = data;
    });
  }

  showAll(){
    this.getUser();
  }

  updateUser(id: string) {
    this.router.navigate(['user-update', id]);
  }

  searchUser(id: string,name:string): Promise<boolean>{
    return this.router.navigate(['user', id,name]);
  }
  
  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(data => {
      console.log(data);
      this.getUser();
    })
  }

  

 getByIdAndName(){
    this.userService.getUserByIdAndName(this.search.id,this.search.name).subscribe(data=>{
      this.users=data;
    })
  }

  onSubmit(){
    if (this.search.id==null && this.search.name==null || this.search.id=="" && this.search.name==""){
      this.getUser();
    }else{
      this.getByIdAndName();
    }
  }

  exportHTML() {
    this.userService.exportHTML().subscribe((data)=>{
      alert("exported successfully")
    })
  }

  exportPDF() {
    this.userService.exportPDF().subscribe((data)=>{
      alert("exported successfully")
    })
  }

  exportExcel(): void{
    const wsheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.users);
    const wbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wbook, wsheet, 'Sheet1');
    XLSX.writeFile(wbook, this.fileName);
    alert("exported successfully")
  }

}

