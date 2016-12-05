import { Component, OnInit,ViewChild } from '@angular/core';
import {UserData, User} from '../../entities/User';
import {IDatepickerData} from  '../../entities/IDatepickerData';
import {UserService} from '../../services/user.service';
import {NotificationService} from '../../services/notification.service';
import {AccountService} from '../../services/account.service';
import {BasicUserFormComponent} from '../../common/basicUserForm.component';
import {ChangePasswordComponent} from '../../common/changePassword.component';
import { Router } from '@angular/router';
const now = new Date();
@Component({
  selector: 'register',
  templateUrl: 'business/register/register.html',
  styleUrls: ['business/register/register.css']
})
export class RegisterComponent implements OnInit{
    user:User;    
    @ViewChild(BasicUserFormComponent)
    private userForm:BasicUserFormComponent;
    @ViewChild(ChangePasswordComponent)
    private passwordForm:ChangePasswordComponent;    
    userNameReadOnly:boolean=false;
    editMode:boolean=false;
    constructor(private apiUser:UserService,
            private apiAccount:AccountService,
            private router:Router,
            private notification: NotificationService){ }
    ngOnInit() {
      this.user=new User();
      this.user.birthDate=null;      
    }
    errorFormHandler(message:string){
        this.notification.errorMessage(message);
    }
    register(){
      if(this.userForm.validateForm()){
        if(this.passwordForm.validatePassword())
          this.apiUser.register(this.user, this.passwordForm.password).then(userData=>{
            this.apiAccount.setUsersToCookies( userData.userData, userData.token);
            this.router.navigate(['./home']);
          }).catch(x=>this.notification.errorMessage('Unable to register user'));
      }
    }    
}

