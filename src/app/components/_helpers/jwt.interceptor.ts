import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import { AuthService } from './../../auth.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService,  private router: Router,) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        // @ts-ignore
        if (currentUser && currentUser.token) {
            // @ts-ignore
            request = request.clone({
                setHeaders: {
                    // @ts-ignore
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);

        // return next.handle(request).pipe(
        //     catchError((err: HttpErrorResponse) => {
        //
        //         if (err.status === 401) {
        //             this.router.navigateByUrl('/login');
        //         }
        //
        //         return throwError( err );
        //
        //     })
        // );

    }
}
