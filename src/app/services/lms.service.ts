import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "../../environments/environment"
import { User } from '../models/user.model';
import { Course } from '../models/course.model';

@Injectable()
export class LmsService {
    constructor(private http: HttpClient) { }
    
    getAllCourses(){
        return this.http.get<Course[]>(environment.getAllCourses);
    }

    login(user: User) {
        return this.http.post(environment.login, user);
    }

    register(user: User) {
        return this.http.post(environment.register, user);
    }

    addCourse(courseData: Course) {
        return this.http.post(environment.addCourse, courseData);
    }  

    deleteCourse(courseData: Course){
        return this.http.delete(environment.delete + "/" + courseData.courseId);
    }

    getCoursesByTechnology(technology: string) {
        return this.http.get(environment.getCoursesByTechnology + "/" + technology);
    }
      
    getCourseByDuration(technology: string, startDate: string, endDate: string) {
        let queryParams = new HttpParams().append("technology",technology).append("startDate", startDate).append("endDate", endDate);
        return this.http.get(environment.getCourseByDuration, {params: queryParams});
    }
      
}