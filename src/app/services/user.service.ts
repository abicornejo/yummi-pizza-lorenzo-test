import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//import { User } from '@/../../../src/app/models';
import { User } from './../models/User';
import {config} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        // @ts-ignore
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }

    register(user: User) {
        // @ts-ignore
        return this.http.post(`${config.apiUrl}/users/register`, user);
    }

    delete(id: number) {
        // @ts-ignore
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }
}
