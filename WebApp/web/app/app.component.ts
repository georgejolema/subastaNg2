import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';

import {UserData} from '../entities/User';
import { Router } from '@angular/router';
import { NotificationService} from '../services/notification.service';
import {UserService} from '../services/user.service';
@Component({
  selector: 'my-app',
  templateUrl: 'app/app.html'
})
export class AppComponent implements OnInit {
    loggedIn:boolean;
    
    constructor(private cookie:CookieService,
              private router:Router,
              private notification: NotificationService,
              private apiUser: UserService){}
    LoggedInEvent(data:UserData){
      this.loggedIn = data!=null;
      this.router.navigate(['./home']);    
    }
    ngOnInit() {   
      this.loggedIn=this.cookie.get("subasta_user_registered")!==undefined;
    }
    closeAlert(alert: {type:string, message:string}) {
          this.notification.remove(this.alerts.indexOf(alert));
    }
    get alerts(): Array<{type:string, message:string}>{
      return this.notification.alerts;
    }

    get hasUser():boolean{
      return this.apiUser.user!=null;
    }

 }
