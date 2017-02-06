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
            .post('api/item/newitem', JSON.stringify(item), { headers: headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }
  
}