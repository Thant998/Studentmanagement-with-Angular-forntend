import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from '../models/Course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent  implements OnInit {
  time=new Date().toDateString();
  id=sessionStorage.getItem("userId")
  course: Course = new Course();
  message='';
  submitted=false;
  constructor(private courseService: CourseService,private router: Router) { }

  ngOnInit(): void { }

  saveCourse() {
    this.courseService.createCourse(this.course).subscribe(data => {
            console.log(data);
            this.goToCourseList();
          });
    }

  goToCourseList(){
    this.router.navigate(['/course']);
  }

  onSubmit(form:NgForm){
    if (form.valid){
      this.submitted=false;
      console.log(this.course);
      this.saveCourse();
      alert("Successfully")
    } else {
      this.submitted=true;
      console.log('invalid form');
    }
  }
}
