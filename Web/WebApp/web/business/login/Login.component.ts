import { Component, Output, EventEmitter } from '@angular/core';
import {User} from '../../entities/User';
import {AccountService} from '../../services/account.service';

@Component({
    selector:'login',
    templateUrl:'business/login/Login.html'
})
export class LoginComponent{   
    name:string;
    password:string;
    @Output() UserLoggedIn = new EventEmitter();
    constructor(private apiAccount:AccountService){}
    Logout(){
        this.apiAccount.logOff(()=>this.UserLoggedIn.emit(null));       
    }
    Login(){
        this.apiAccount.login(this.name, this.password, x=>{
            this.name='';
            this.password='';      
            this.UserLoggedIn.emit({userData:this.user,token:x.token});
        })
    }
    get user():User{
        return this.apiAccount.getUsersFromCookies();
    }
}