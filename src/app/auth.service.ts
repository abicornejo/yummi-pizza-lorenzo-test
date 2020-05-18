import { Injectable , OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, config, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './models';
@Injectable({ providedIn: 'root' })
export class AuthService {
    //public urlService = 'http://pizzaservice.itcodesolutions.com/api/auth';
    public urlService = 'http://127.0.0.1:8000/api/auth';
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;


    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email, password) {
        // @ts-ignore
        return this.http.post<any>(`${this.urlService}/login`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                if(user.success){
                    localStorage.setItem('currentUser', JSON.stringify(user.user));
                    this.currentUserSubject.next(user.user);
                    return user.user;
                }
                return false;

            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }


    // signup(username: string, email: string, password: string){
    //     const header = {
    //         'X-Requested-With':'XMLHttpRequest',
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Headers': 'Content-Type',
    //         'Access-Control-Allow-Methods': 'POST',
    //         'Access-Control-Allow-Origin': '*'
    //     };
    //     const httpOptions = new HttpHeaders(header);
    //     const body = JSON.stringify({ name: username, email: email, password: password, password_confirmation: password});
    //     return this.httpClient.post(`${this.PHP_API_SERVER}/api/v1/auth/register`, body, {headers: httpOptions});
    // }
    //
    // signin(email: string, password: string){
    //     const header = {
    //         'X-Requested-With':'XMLHttpRequest',
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Headers': 'Content-Type',
    //         'Access-Control-Allow-Methods': 'POST',
    //         'Access-Control-Allow-Origin': '*'
    //     };
    //     const httpOptions = new HttpHeaders(header);
    //     const body = JSON.stringify({  email: email, password: password});
    //     return this.httpClient.post(`${this.PHP_API_SERVER}/api/v1/auth/login`, body, {headers: httpOptions})
    //         .pipe(
    //             map(
    //                 (response) =>  {
    //
    //                         // @ts-ignore
    //                     const token = response.data.token;
    //                         const base64Url = token.split('.')[1];
    //                         const base64 = base64Url.replace('-','+').replace('_','/');
    //                         return {token: token, decoded : JSON.parse(window.atob(base64))};
    //                 }),
    //             tap(
    //                 tokenData => {
    //                     localStorage.setItem('token', tokenData.token);
    //                 }
    //             )
    //         );
    //
    // }
    //
    getToken() {
        return localStorage.getItem('token');
    }

    getUrlService() {
        return this.urlService;
    }
}
