import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LmsService } from 'src/app/services/lms.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LmsService]
})
export class LoginComponent{
  username: string = "";
  password: string = "";
  hide: boolean = true;
  nameData: string = ""; 
  incorrectData: boolean = false;
  
  constructor(
    private route: Router,
    private lmsService: LmsService,
    private notifier: NotifierService
  ) {
    localStorage.setItem('userName','');
  }

  submit(){
    if(this.username == "" || this.password == ""){
      this.notifier.notify("error","Please enter Username and Password");
      return;
    }
    let user: User = {
      userName: this.username,
      password: this.password,
      userId: '',
      userEmail: '',
      isAdmin: false
    }
    this.lmsService.login(user).subscribe((usersData: any) => {
      if(usersData != null){
        this.notifier.notify("success","Login Successful");
        localStorage.setItem('user',user.userName);
        localStorage.setItem('isAdmin',usersData.isAdmin);
        this.route.navigate(["/home"]);
      }
      else{
        this.notifier.notify("error","Entered Username or Password is Incorrect");
      }  
    },
    (error) => {
      this.notifier.notify("error","Unable to login user");
    });
  }

  clear(){
    this.username ="";
    this.password = "";
  }

  register(){
    this.route.navigate(["/register"]);
  }
}
