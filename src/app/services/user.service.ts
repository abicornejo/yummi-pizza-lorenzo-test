import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

//import { User } from '@/../../../src/app/models';
import { User } from './../models/User';
import {config} from 'rxjs';
import {AuthService} from './../auth.service';
@Injectable({ providedIn: 'root' })
export class UserService implements OnInit {
    public urlService : string;
    constructor(private http: HttpClient, private authService: AuthService) {
        this.urlService = this.authService.getUrlService();
    }
    ngOnInit(){
        this.urlService = this.authService.getUrlService();
    }

    getAll() {
        // @ts-ignore
        return this.http.get<User[]>(`${this.urlService}/users`);
    }

    register(user: User) {
        // @ts-ignore
        return this.http.post(`${this.urlService}/register`, user);
    }

    delete(id: number) {
        // @ts-ignore
        return this.http.delete(`${this.urlService}/users/${id}`);
    }
}
