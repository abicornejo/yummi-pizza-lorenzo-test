import { Injectable , OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, config, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './../models';
import {AuthService} from './../auth.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnInit {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public urlService : string;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable(); this.urlService = this.authService.getUrlService();
        this.urlService = this.authService.getUrlService();
    }
    ngOnInit(){
        this.urlService = this.authService.getUrlService();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email, password) {debugger;
        // @ts-ignore
        return this.http.post<any>(`${this.urlService}/login`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                if(user.success){
                    localStorage.setItem('currentUser', JSON.stringify(user.user));
                    this.currentUserSubject.next(user);
                    return user;
                }

            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
