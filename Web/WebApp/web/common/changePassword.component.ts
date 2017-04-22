import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
    selector: 'change-password',
    template: `
    <div class="form-group form-inline">           
        <input *ngIf="editMode" type="password" class="form-control"  [(ngModel)]="previousPassword" placeholder="Previous password" name="previousPassword"/>
        <input type="password" class="form-control"  [(ngModel)]="password" placeholder="Password" name="password"/>
        <input type="password" class="form-control"  [(ngModel)]="password2" placeholder="Confirm password" name="password2"/>            
    </div>
    `
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