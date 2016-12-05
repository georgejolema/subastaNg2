import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {IDatepickerData} from '../../entities/IDatepickerData'
@Component({
    selector:'items',
    templateUrl:'business/items/Items.html'
})
export class ItemsComponent implements OnInit{
    constructor(private apiAccount:AccountService){}   
    model:IDatepickerData;
   
    ngOnInit(){
        this.apiAccount.validateUser();
    }


}