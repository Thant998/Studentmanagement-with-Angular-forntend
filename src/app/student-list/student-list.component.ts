import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { Student } from '../models/Student';
import { StudentService } from '../student.service';
import * as XLSX from 'xlsx';
import { Course } from '../models/Course';
import { CourseService } from '../course.service';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit {
  id=sessionStorage.getItem("userId")
  time=new Date().toDateString();
  fileName= 'Student-Excel.xlsx';
  student:Student=new Student();
  students : Student[];
  courseList:Course[];
  coursename:Course;

  constructor(private studentService: StudentService,private courseService:CourseService,private router: Router) {
    this.students =[];
    this.courseList=[];
    this.coursename=new Course();
  }

  ngOnInit(): void {
    this.getStudent();
  }

  private getStudent(){
    this.studentService.getStudentList().subscribe(data=>{
      this.students=data;
    });
  }

  updateStudent(id: string) {
    this.router.navigate(['student-update', id]);
  }

  onSubmit(){
    if (this.student.id==null && this.student.name==null && this.coursename.name==null || 
      this.student.id=="" && this.student.name=="" && this.coursename.name==""){
        this.getStudent();
  }else{
   this.searchStudent();
  }
}

  searchStudent(){
    this.studentService.getStudentByIdOrNameOrCourse(this.student.id,this.student.name,this.coursename.name).subscribe(data => {
      this.students=data;
    });
  }

  exportHtml() {
    this.studentService.exportHTML().subscribe((data) => {
      alert("exported successfully")
    })
  }

  exportPdf() {
    this.studentService.exportPDF().subscribe((data) => {
      alert("exported successfully")
    })
  }

  exportExcel(): void{
    
    const wsheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.students);
    const wbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wbook, wsheet, 'Sheet1');
    XLSX.writeFile(wbook, this.fileName);
    alert("exported successfully")
  }

}
