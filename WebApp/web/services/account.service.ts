import { Injectable }    from '@angular/core';
import {UserService} from './user.service';
import {CookieService} from 'angular2-cookie/core';
import { Router } from '@angular/router';
import {User, UserData} from '../entities/User';
import {NotificationService} from './notification.service';


@Injectable()
export class AccountService{
    constructor(private apiUser: UserService,
                private router: Router,
                private cookie: CookieService,
                private notification: NotificationService){}
    
    getUsersFromCookies():User{
        let user = this.cookie.get("subasta_user_registered");
        let token = this.cookie.get("subasta_token_registered");
        if(user !== undefined){
            this.apiUser.user=JSON.parse(user);            
            this.apiUser.token=token;               
        }
        return this.apiUser.user;
    }

    setUsersToCookies(user:User, token:string=''){
        this.apiUser.user=user;
        this.cookie.put("subasta_user_registered", JSON.stringify(user));
        if(token!=''){
            this.apiUser.token=token;     
            this.cookie.put("subasta_token_registered", token);
        }
    }

    logOff(callBack:()=>void){
        this.apiUser.logout().then(x=>{
            this.apiUser.token="none";
            this.apiUser.user=null;
            this.cookie.remove("subasta_user_registered");
            callBack();             
        })
        .catch(x=>this.notification.errorMessage('There is an error while logging off'));
    }

    login(userName:string, password:string, callBack: (user:UserData)=>void){
        this.apiUser.login(userName,password).then(x=>{
            this.setUsersToCookies(x.userData,x.token);
            callBack(x);                      
        })
        .catch(x=>{
            this.notification.errorMessage('Invalid user or password');
        });
    }

    validateUser():boolean{
        if(this.apiUser.user==null){
            this.router.navigate(['./home']);
            return false;
        }
        return true;
    }
}