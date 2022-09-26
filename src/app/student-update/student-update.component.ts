import { Component, OnInit } from '@angular/core';
import {Student} from '../models/Student';
import { Course } from '../models/Course';
import { StudentService } from '../student.service';
import { CourseService } from '../course.service';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit {
  userid=sessionStorage.getItem("userId")
  time=new Date().toDateString();
  id!:string;
  courses!: Course[] ;
  students!:Student[];
  student :Student= new Student();
  constructor(private studentService: StudentService,private courseService: CourseService,
               private router: Router,private route: ActivatedRoute,) { 
    this.courses=[];
    this.students=[];
  }

  ngOnInit(): void {
    this.getCourse();
    this.student.courses=[]
    this.id = this.route.snapshot.params['id'];
    this.studentService.getStudentById(this.id).subscribe( data => {
      this.student = data;
    });
  }

  goToStudentList(){
    this.router.navigate(['/student']);
  }

  saveStudent(){
    this.studentService.updateStudent(this.id,this.student).subscribe(data =>{
        console.log(data);
        this.goToStudentList();});
  }

  onSubmit(){
    if(this.student.name=== "" || this.student.dob === "" ||  this.student.phone === "" ||
      this.student.gender==="" || this.student.education==="" || this.student.courses.length===0){
      this.router.navigate(['/student-update/',this.student.id]);
    }else{
      this.saveStudent()
      this.goToStudentList();
    }
  }

  deleteStudent(id: string) {
    this.studentService.deleteStudent(id).subscribe(data => {
      console.log(data);
      this.goToStudentList()})
  }

  private getCourse(){
    this.courseService.getCourseList().subscribe(data => {
      this.courses = data;
    });
  }

  toGetCourse(courseid :string) {
    let result=false;
      for(let course of this.student.courses){
        if(course.id==courseid){
          result=true;
          break;
        }
      }
      return result;
   }

  addCourse(courseid :string){
    let result = true
    let index =0
    for(let i=0;i<this.student.courses.length;i++){
      if(this.student.courses[i].id==courseid) {
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
 
}