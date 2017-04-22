import 'rxjs/add/operator/toPromise';
export class BasicService{
    protected baseUrl="http://localhost:3000/"
    protected  handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}