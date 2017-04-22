import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';

@Component({
    selector:'cart',
    templateUrl:'business/cart/Cart.html'
})
export class CartComponent implements OnInit{
    constructor(private apiAccount: AccountService){}
    ngOnInit(){
        this.apiAccount.validateUser();
    }    
}