import { Injectable, OnInit} from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {AuthService} from './../auth.service';
@Injectable({
    providedIn: 'root'
})
export class GlobalServices implements OnInit {

    public urlService : string;
    constructor(private httpClient: HttpClient, private authService: AuthService) {
        this.urlService = this.authService.getUrlService();
    }
    ngOnInit(){
        this.urlService = this.authService.getUrlService();
    }

    callApiRest( parameters: any ) {
        const header = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': parameters.method,
            'Access-Control-Allow-Origin': '*'
        };
        const token = this.authService.getToken();
        const httpOptions = new HttpHeaders(header);

        if (parameters.method === 'GET') {
            return this.httpClient.get<any>(`${this.urlService}/${parameters.urlMethod}`, {headers: httpOptions, params : parameters.params})
                .toPromise()
                .then(res => <any[]>res);
        } else if(parameters.method === 'POST'){
            const body = JSON.stringify(parameters.params);
            return this.httpClient.post(`${this.urlService}/${parameters.urlMethod}?token=${token}`, body, {headers: httpOptions})
                .toPromise()
                .then(res => <any[]>res);
        }
        else if(parameters.method === 'PUT'){
            const body = JSON.stringify(parameters.params);
            return this.httpClient.put(`${this.urlService}/${parameters.urlMethod}?token=${token}`, body, {headers: httpOptions})
                .toPromise()
                .then(res => <any[]>res);
        }else if(parameters.method === 'DELETE'){
            return this.httpClient.delete(`${this.urlService}/${parameters.urlMethod}`).toPromise().then(res => <any[]>res);
        }

    }
}
