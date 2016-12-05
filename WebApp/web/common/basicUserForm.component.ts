import { Component, Input , Output, EventEmitter, OnInit} from '@angular/core';
import {IDatepickerData} from  '../entities/IDatepickerData';
import {User} from '../entities/user';
const now = new Date();
@Component({
  selector: 'basic-user-form',
  templateUrl: 'common/basicUserForm.html'
})
export class BasicUserFormComponent implements OnInit{
    @Input() user:User;
    @Input() userNameReadOnly:boolean;
    @Output() errorHandler=new EventEmitter();
    datePicker:DatePickerHandler;  
    ngOnInit(){
         this.datePicker=new DatePickerHandler();
    }
   validateForm():boolean{      
      if(this.user.userName == null || this.user.userName==''){
        this.errorHandler.emit('Error, name cannot be blank');
        return false;
      }
      if(this.user.firstName == null || this.user.firstName==''){
        this.errorHandler.emit('Error, first name cannot be blank');
        return false;
      }

      if(this.user.lastName == null || this.user.lastName==''){
        this.errorHandler.emit('Error, last name cannot be blank');
        return false;
      }

      if(this.user.birthDate==null){
        this.errorHandler.emit('Error, birth date cannot be blank');
        return false;
      }

      if(this.user.email == null || this.user.email==''){
        this.errorHandler.emit('Error, email cannot be blank');
        return false;
      }
      return true;
    }
}


class DatePickerHandler{
    birthdatePlaceholder:string ="Birth date";
    minDate:IDatepickerData = {month:1,day:1,year:1900};
    maxDate:IDatepickerData = {month:12,day:31, year:(new Date().getFullYear())-15};
}