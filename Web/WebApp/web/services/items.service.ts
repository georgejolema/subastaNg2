import {Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';
import {Item, Image} from '../entities/Item';
import {UserService} from './user.service';
import {BasicService} from './basicService';
import {ServiceResponse} from '../entities/ServiceResponse';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ItemService extends BasicService{
    constructor(private http:Http,
                private apiUser:UserService){
                    super();
    }

    Insert(item:Item): Promise<ServiceResponse>{
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.apiUser.token
        });
        return this.http
            .post(this.baseUrl+'api/item/newitem', JSON.stringify({item:item}),{ headers: headers, withCredentials: true  })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    GetItems(user:String,token:String):Promise<Array<Item>>{
         let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.apiUser.token
        });
        return this.http.get(this.baseUrl + 'api/item/getitem/'+user+"?access_token="+token)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
    }
  
}