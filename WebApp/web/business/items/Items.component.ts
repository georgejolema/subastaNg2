import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {Item} from '../../entities/Item';

@Component({
    selector:'items',
    templateUrl:'business/items/Items.html'
})
export class ItemsComponent implements OnInit{
    constructor(private apiAccount:AccountService){}   
    item:Item;
    ngOnInit(){
        if(this.apiAccount.validateUser()){
            this.item=new Item();
        }
    }


}