import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {Item} from '../../entities/Item';
import {IBlob} from '../../common/upload.component';
import {ItemService} from '../../services/items.service';
import {NotificationService} from '../../services/notification.service';
@Component({
    selector:'items',
    templateUrl:'business/items/Items.html'
})
export class ItemsComponent implements OnInit{
    constructor(private apiAccount:AccountService, 
                private apiItem:ItemService,
                private notification:NotificationService){}   
    item:Item;
    ngOnInit(){
        if(this.apiAccount.validateUser()){
            this.item=new Item();
        }
    }
    onChunkLoaded(blob: IBlob){

    }

    addItem(){
        if(this.validateFields())
            this.apiItem.Insert(this.item).then(x=>console.log(x));
    }
    
    private validateFields(){
        if(this.item.name==""){
            this.notification.errorMessage("The name is required to add a new item");
            return false;
        }
        if(this.item.description==""){
            this.notification.errorMessage("The description is required to add a new item");
            return false;
        }
        if(this.item.category.length==0){
            this.notification.errorMessage("There must be at least one category to add a new item");
            return false;
        }
        if(this.item.price==0){
            this.notification.errorMessage("The price is required to add a new item");
            return false;
        }
        if(this.item.brand==""){
            this.notification.errorMessage("The brand is required to add a new item");
            return false;
        }
        if(this.item.images.length){
            this.notification.errorMessage("There must be at least one image configured for the new item");
            return false;
        }
        return true;
    }

}