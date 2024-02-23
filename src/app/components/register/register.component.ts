import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LmsService } from 'src/app/services/lms.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [LmsService]
})
export class RegisterComponent {
  email: string = "";
  username : string ="";
  password : string ="";
  hide: boolean = true;
  nameData: string = ""; 

  constructor(
    private route: Router,
    private lmsService: LmsService,
    private notifier: NotifierService
  ) {}

  submit(){
    if(this.username == "" || this.password == "" || this.email == "")
    {
      this.notifier.notify("error","Please Enter All Mandatory fields");
      return;
    }
    if(!(this.email.includes("@") && this.email.includes(".com"))){
      this.notifier.notify("error","Please enter correct email");
      return;
    }
    if(!this.password.match(/^[a-z0-9]+$/i) || this.password.length < 8){
      this.notifier.notify("error","Password should be Alphanumeric and at least 8 characters");
      return;
    }
    let user: User = {
      userName: this.username,
      password: this.password,
      userId: '',
      userEmail: this.email,
      isAdmin: false
    }
    this.lmsService.register(user).subscribe((usersData: any) => {
      if(usersData != null){
        this.notifier.notify("success","Registration Successful");
        this.route.navigate(["/login"]);
      }
    },
    (error) => {
      this.notifier.notify("error","Unable to register user");
    });
   
  }
  clear(){
    this.username ="";
    this.password = "";
    this.email = "";
  }

  register(){
    this.route.navigate(["/register"]);
  }

}
