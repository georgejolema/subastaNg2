import { Component } from '@angular/core';
import{UserService} from '../../services/user.service';
import{User} from '../../entities/User';

@Component({
  selector: 'home',
  templateUrl: 'business/home/home.html',
  styleUrls: ['business/home/home.css']
})
export class HomeComponent{
    constructor(private apiUser:UserService){}  
    existsUser():boolean{
      return this.user!=null;
    }
    get user():User{
      return this.apiUser.user;
    }   
}