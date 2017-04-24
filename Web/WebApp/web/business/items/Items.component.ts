import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {Item} from '../../entities/Item';
import {IBlob} from '../../common/upload.component';
import {ItemService} from '../../services/items.service';
import {NotificationService} from '../../services/notification.service';
import {UserService} from '../../services/user.service';
@Component({
    selector:'items',
    templateUrl:'business/items/Items.html'
})
export class ItemsComponent implements OnInit{
    wizardElement:wizardViewModel;
    item:Item;
    listItems:Array<any>;
    constructor(private apiAccount:AccountService, 
                private apiItem:ItemService,
                private notification:NotificationService,
                private apiUser:UserService){}   
   
    ngOnInit(){
        this.wizardElement=new wizardViewModel();
        if(this.apiAccount.validateUser()){
            this.item=new Item();
            this.item.user=this.apiUser.user.userName;
            this.refreshList();
        }
    }
    onChunkLoaded(blob: IBlob){
    }

    next(){
         this.wizardElement.setNextPosition();
    }
    back(){
        this.wizardElement.setBackPosition();
    }

    submit(){
        if(this.validateFields())
            this.apiItem.Insert(this.item).then(function(x){
                this.refreshList();
            });
    }   

    private refreshList(){
        this.apiItem.GetItems(this.item.user, this.apiUser.token).then(x=>this.setListValues(x));
    }

    private setListValues(items:Array<Item>){
        this.listItems=items;
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
       /* if(this.item.category.length==0){
            this.notification.errorMessage("There must be at least one category to add a new item");
            return false;
        }*/
        if(this.item.price==0){
            this.notification.errorMessage("The price is required to add a new item");
            return false;
        }
        if(this.item.brand==""){
            this.notification.errorMessage("The brand is required to add a new item");
            return false;
        }
       /* if(this.item.images.length){
            this.notification.errorMessage("There must be at least one image configured for the new item");
            return false;
        }*/
        return true;
    }

}

class wizardViewModel{
    wizardPosition:number;
    wizardItems:String[];
    constructor(){
        this.wizardPosition=0;
        this.wizardItems=["General forms", "Images"];
    }
    setPosition(value:number){
        this.wizardPosition=value;
    }

    setNextPosition(){
        if(!this.isLastPosition())
            this.wizardPosition++;
    }

    setBackPosition(){
        if(!this.isFirstPosition())
            this.wizardPosition--;
    }

    isLastPosition():Boolean{
        return this.wizardPosition==this.wizardItems.length-1;
    }

    isFirstPosition():Boolean{
        return this.wizardPosition==0;
    }

    
}