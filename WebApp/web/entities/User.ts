import {IDatepickerData} from './IDatepickerData'
export class User{
    userName:string;
    firstName:string;
    lastName:string;
    email:string;
    birthDate:IDatepickerData;
    address:InvoiceAddress[];
    cards:Payment[];
    constructor(){
        this.birthDate={day:1,month:1,year:2000};
    }
}

export class InvoiceAddress{
    address:string;
    zipCode:string;
    phoneNumber:string;
    name:string;
}

export class Payment{
    name:string
}

export interface UserData{
    userData:User;
    token:string;
}

