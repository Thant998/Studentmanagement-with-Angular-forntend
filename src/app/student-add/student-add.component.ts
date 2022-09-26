import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { Student} from '../models/Student';
import { Course } from '../models/Course';
import { StudentService } from '../student.service';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {
  id=sessionStorage.getItem("userId")
  time=new Date().toDateString();
  student:Student=new Student();
  courses: Course[] ;
  constructor(private studentService: StudentService,private courseService: CourseService,
     private router: Router) { 
        this.courses=[]
    }

  ngOnInit(): void {
    this.getCourses()
    this.student.courses=[]
  }

  addCourse(courseid :string) {
    let result = true
    let index =0
    for(let i=0;i<this.student.courses.length;i++){
      if(this.student.courses[i].id==courseid){
        result=false
        index=i
        break
      }
    }
    if(result){
      this.student.courses.push({id:courseid,name:''})
    }else{
      this.student.courses.splice(index,1)
    }
  }

  private getCourses() {
    this.courseService.getCourseList().subscribe(data => {
    this.courses = data;});
  }

  goToStudentList(){
    this.router.navigate(['/student']);
  }

  saveStudent(){
    this.studentService.createStudent(this.student)
      .subscribe(data =>{
          console.log(data);
          this.goToStudentList();
        }
      );
  }

  onSubmit(){
    if(this.student.name=== "" || this.student.dob === "" || this.student.phone === "" || this.student.gender==="" ||
      this.student.education===""|| this.student.courses.length===0){
      this.router.navigate(['/student-add/']);
    }else {
      this.saveStudent();
    }
  }
}
