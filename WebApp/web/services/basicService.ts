import 'rxjs/add/operator/toPromise';
export class BasicService{
    protected  handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}