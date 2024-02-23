import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Course } from 'src/app/models/course.model';
import { LmsService } from 'src/app/services/lms.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
  providers: [LmsService]
})
export class AddCourseComponent implements OnInit{
  courseName: string = "";
  technology: string = "";
  startDate: any = "";
  endDate: any = "";
  launchUrl: string = "";
  details: string = "";
  isLoggedIn: boolean = false;

  constructor(
    private lmsService: LmsService,
    private notifier: NotifierService,
    private route: Router) { }

  ngOnInit(): void {
    var username = localStorage.getItem('user');
    if(username == null || username == ""){
      this.isLoggedIn = false;
      return;
    }
    this.isLoggedIn = true;
  }

  addCourse(){
    if(this.courseName == "" || this.technology == "" || this.startDate.toString() == "" || this.endDate.toString() == "" || this.launchUrl == "" || this.details == ""){
      this.notifier.notify("error","Please enter all mandatory fields");
    }
    else{
      let courseData: Course = {
        courseId: '',
        courseName: this.courseName,
        technology: this.technology,
        startDate: new Date(this.startDate),
        endDate: new Date(this.endDate),
        launchUrl: this.launchUrl,
        details: this.details
      }
      this.lmsService.addCourse(courseData).subscribe((courseRes: any) => {
        this.notifier.notify("success","Course added successfully");
        this.route.navigate(["/home"]);
    });
    }
  }

  cancel(){
    this.route.navigate(["/home"]);
  }

}
