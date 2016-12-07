import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {User, UserData} from '../entities/User';
@Injectable()
export class UserService {
    private url: string = 'api/user';
    public user:User;
    public token:string="none";
    constructor(private http: Http) { }

    login(userName:string, password:string):Promise<UserData>{
        return this.post({userName:userName, password:password}, 'login');
    }

    reloadUser(callback:(x:User)=>void){
        this.postUser({userName:this.user.userName},'reload')
            .then(x=>{
                this.user=x;
                if(this.user.address == null) this.user.address = [];
                if(this.user.cards == null) this.user.cards = [];    
                callback(x);
            })
            .catch(x=>console.log("error occured retrieving user"));
    }

    logout(){
        return this.http.get(this.url + '/logout'+this.TokenUrl)
               .toPromise()
               .then(response => response)
               .catch(this.handleError);
    }

    register(user:User, password:string){
        return this.post({user:user, password:password}, 'register');
    }

    update(user:User, password:string=""){
        return this.postUser({user:user, password:password},'update');
    }

    validatePassword(userName:string, password:string){
        return this.postUser({userName:userName, password:password},"validatepassword");
    }

    testAPI(){
        return this.http.get(this.url + '/register'+this.TokenUrl)
               .toPromise()
               .then(response => response)
               .catch(this.handleError);
    }


    private post(data:any, fnName:string = ""): Promise<UserData> {
       let headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http
            .post(this.url + (fnName == '' ? '' : '/' + fnName), JSON.stringify(data), { headers: headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    private postUser(data:any, fnName:string=""): Promise<User>{
         let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
        });
        return this.http
            .post(this.url + (fnName == '' ? '' : '/' + fnName), JSON.stringify(data), { headers: headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

     private put(data:any, fnName:string = ""): Promise<UserData> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put(this.url + (fnName == '' ? '' : '/' + fnName), JSON.stringify(data), { headers: headers })
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }



    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    private get TokenUrl(){
        return '?access_token='+this.token;
    }
}

