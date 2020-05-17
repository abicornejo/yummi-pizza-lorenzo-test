import {Injectable} from "@angular/core";
//import {HttpClientModule, HttpResponse} from "@angular/common/http";
import {HttpClient, HttpParams, HttpHeaders, HttpErrorResponse, HttpClientModule} from '@angular/common/http';
import {Observable} from "rxjs";
import {LoginObject} from "./login-object.model";
import {Session} from "./../../../models/Session";
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClientModule) {}
    private basePath = '/api/authenticate/';

    login(loginObj: LoginObject): Observable<Session> {
        // @ts-ignore
        return this.http.post(this.basePath + 'login', loginObj).map(this.extractData);
    }
    logout(): Observable<Boolean> {
        // @ts-ignore
        return this.http.post(this.basePath + 'logout', {}).map(this.extractData);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body;
    }
}
