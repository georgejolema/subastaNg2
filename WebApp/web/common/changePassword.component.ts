import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
    selector: 'change-password',
    templateUrl: 'common/changePassword.html'
})
export class ChangePasswordComponent {
    password:string;
    password2:string;  
    previousPassword:string;
    @Input() editMode:boolean;
    @Output() errorHandler=new EventEmitter();
    validatePassword():boolean{
        if(this.editMode && this.previousPassword==''){
            this.errorHandler.emit('Previous password is required');
            return false;
        }
        if(this.password==''){
            this.errorHandler.emit('Password cannot be blank');
            return false;
        }
        if(this.password!=this.password2){
          this.errorHandler.emit('Confirmation password doesn\'t match');
          return false;
        }      
        return true;
    }

}