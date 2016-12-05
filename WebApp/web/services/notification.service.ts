import { Injectable }    from '@angular/core';

@Injectable()
export class NotificationService{
    alerts: Array<{type:string, message:string}> = [];

    notify(message:string, type:string="success"){
        this.alerts.push({
            type: type,
            message: message,
        });
    }

    errorMessage(message:string){
        this.notify(message, "danger");
    }

    remove(index:number){
        this.alerts.splice(index, 1);
    }
}

