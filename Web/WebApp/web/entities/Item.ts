import {IDatepickerData} from './IDatepickerData'
export class Item{
    name:string;
    description:string;
    price:number;
    expiration:IDatepickerData;
    category:Array<string>
    status:number;
    brand:string;
    images:Array<Image>;
    user:string;
    constructor(){
        this.images=[];
        this.category=[];
        this.name="";
        this.description="";
        this.price=0;
        this.expiration={day:1,month:1,year:2001};
        this.brand="";
        this.status=0;
        this.user="";
    }
   
}


export class Image{
    url:string;
    thumbnail:string;
    default:boolean;
}