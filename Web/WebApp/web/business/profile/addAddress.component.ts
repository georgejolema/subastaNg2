import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InvoiceAddress} from '../../entities/User';
@Component({
    selector:'add-address',
    templateUrl: 'business/profile/addAddress.html',
    styleUrls:['business/profile/addAddress.css']
})
export class AddAddressComponent{
    @Input() address:InvoiceAddress;
    @Output() onRemoveItem = new EventEmitter();
    remove(){
        this.onRemoveItem.emit(this.address);
    }
}