import {IDatepickerData} from './IDatepickerData'
export class Item{
    name:string;
    description:string;
    price:number;
    expiration:IDatepickerData;
    category:Array<string>
    status:number;
    images:Array<Image>;
    constructor(){
        this.images=[];
        this.category=[];
    }
}


export class Image{
    url:string;
    thumbnail:string;
    default:boolean;
}