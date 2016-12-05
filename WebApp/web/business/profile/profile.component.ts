import { Component, OnInit, ViewChild} from '@angular/core';
import { User, InvoiceAddress} from '../../entities/User';
import {UserService} from '../../services/user.service';
import {AccountService} from '../../services/account.service';
import {NotificationService} from '../../services/notification.service';
import {BasicUserFormComponent} from '../../common/basicUserForm.component';
import {ChangePasswordComponent} from '../../common/changePassword.component';

@Component({
    selector:'profile',
    templateUrl: 'business/profile/profile.html',
    styleUrls:['business/profile/profile.css']
})
export class ProfileComponent  implements OnInit{  
    @ViewChild(BasicUserFormComponent)
    private userForm:BasicUserFormComponent;
    @ViewChild(ChangePasswordComponent)
    private passwordForm:ChangePasswordComponent;    
    user:User=new User();
    userNameReadOnly:boolean=true;
    changePassword:boolean;
    editMode:boolean=true;
    constructor(private apiUser: UserService, 
                private apiAccount: AccountService, 
                private notification: NotificationService){}
    ngOnInit(){
       if(this.apiAccount.validateUser()) this.apiUser.reloadUser(x => this.user = x);
       this.changePassword=false;
    }
    addAddress(){
        this.user.address.push(new InvoiceAddress());
    }
    remove(item:InvoiceAddress){
        let index=this.user.address.indexOf(item);
        this.user.address.splice(index, 1);
    }
    errorFormHandler(message:string){
        this.notification.errorMessage(message);
    }
    save(){
        if(this.userForm.validateForm() && (!this.changePassword || this.passwordForm.validatePassword()))
            this.apiUser.update(this.user, this.changePassword ? this.passwordForm.password : '').then(x=>{
                    this.apiAccount.setUsersToCookies(x);
                    this.notification.notify('User profile modified successfully');
                }).catch(x=>this.notification.errorMessage('Unable to edit the user profile at the moment'));
    }
    
}
