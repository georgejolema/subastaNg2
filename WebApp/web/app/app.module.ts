import './rxjs-extensions';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }         from './app.component';
import {LoginComponent} from '../business/login/Login.component';
import { HomeComponent } from '../business/home/home.component'
import { RegisterComponent} from '../business/register/register.component';
import {BasicUserFormComponent} from '../common/basicUserForm.component';
import {AddAddressComponent} from '../business/profile/addAddress.component';
import {ProfileComponent} from '../business/profile/profile.component';
import {CartComponent} from '../business/cart/cart.component';
import {ItemsComponent} from '../business/items/items.component';
import { SearchComponent } from '../business/search/search.component';
import {DatepickerComponent} from '../common/datepicker.component';
import {ChangePasswordComponent} from '../common/changePassword.component';
import {NotificationService} from '../services/notification.service';
import { routing} from './app.routes';
import {UserService} from '../services/user.service';
import {AccountService} from '../services/account.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import {UploadComponent, UploadFileDirective} from '../common/upload.component';
@NgModule({
  imports:      [  BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    NgbModule.forRoot() ],
  declarations: [ AppComponent, HomeComponent, RegisterComponent, AddAddressComponent, ProfileComponent,
                  SearchComponent, LoginComponent, DatepickerComponent, ItemsComponent, CartComponent, 
                  BasicUserFormComponent, ChangePasswordComponent, UploadComponent, UploadFileDirective ],
  bootstrap:    [ AppComponent ],

  providers: [UserService, CookieService, AccountService, NotificationService ]
})
export class AppModule { }