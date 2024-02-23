import { Component, OnInit, ViewChild } from '@angular/core';
import { LmsService } from "../../services/lms.service";
import { Course, CourseTable } from 'src/app/models/course.model';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[ LmsService ]
})
export class HomeComponent implements OnInit {
  constructor(
    private lmsService: LmsService,
    private notifier: NotifierService,
    private route: Router) { }

  isLoggedIn: boolean = false;
  username: any = "";
  isAdmin: any = "";
  startDate: any = "";
  endDate: any = "";
  displayedColumns: string[] = ['courseName', 'technology', 'details', 'startDate', 'endDate','launchUrl','delete'];
  dataSource = new MatTableDataSource<CourseTable>();
  filterTechnology: string = "";
  courseList: Course[] = [];

  @ViewChild('table')
  table: MatTable<CourseTable> | undefined;

  ngOnInit(): void {
    this.username = localStorage.getItem('user');
    this.isAdmin = localStorage.getItem('isAdmin');
    if(this.username == null || this.username == ""){
      this.isLoggedIn = false;
      return;
    }
    this.isLoggedIn = true;
    this.displayColumnsAdmin();
    this.getAllCourses();
  }

  displayColumnsAdmin(){
    if(this.isAdmin == 'false'){
      this.displayedColumns =  ['courseName', 'technology', 'details', 'startDate', 'endDate','launchUrl'];
    }
  }

  getAllCourses(){
    this.lmsService.getAllCourses().subscribe((courseList: Course[]) => {
        this.courseList = courseList;
        this.setDataSource(courseList);
    });
  }

  setDataSource(courseList: Course[]) {
    let courseTableData : CourseTable[] = [];
    courseList.forEach((courseData: Course) => {
      let courseTable: CourseTable = {
        courseId: courseData.courseId,
        courseName: courseData.courseName,
        technology: courseData.technology,
        startDate: courseData.startDate,
        endDate: courseData.endDate,
        launchUrl: courseData.launchUrl,
        details: courseData.details,
        delete: 'delete icon'
      };
      courseTableData.push(courseTable);
    });
    this.dataSource = new MatTableDataSource(courseTableData);
  }

  addCourse() {
    this.route.navigate(["/addCourse"]);
  }

  applyTechnologyFilter(){
    if(this.filterTechnology == ""){
      this.setDataSource(this.courseList);
    }
    this.lmsService.getCoursesByTechnology(this.filterTechnology).subscribe((courseList: any) => {
      this.setDataSource(courseList);
    });
  }

  applyFilter() {
    if(this.filterTechnology == "" || this.startDate.toString() == "" || this.endDate.toString() == ""){
      this.notifier.notify("error","Please provide technology, start and end date");
      return;
    }
    this.lmsService.getCourseByDuration(this.filterTechnology, new Date(this.startDate).toISOString(), new Date(this.endDate).toISOString()).subscribe((courseList: any) => {
      this.setDataSource(courseList);
    });
  }

  deleteCourse(courseData: Course){
    this.lmsService.deleteCourse(courseData).subscribe((course: any) => {
      this.notifier.notify("success","Course deleted Successfully");
        this.getAllCourses();
    });
  }

  reset(){
    this.startDate = "";
    this.endDate = "";
    this.filterTechnology = "";
    this.setDataSource(this.courseList);
  }

  signOut(){
    this.isLoggedIn = false;
    localStorage.removeItem('user');
    this.route.navigate(["/login"]);
  }
}

