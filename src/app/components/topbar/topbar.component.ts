import { Component } from '@angular/core';
import { AppComponent } from './../../app.component';
import {Router} from '@angular/router';
import {AuthService} from '../../auth.service';
import {User} from '../../models';
@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html'
})
export class TopbarComponent {
    currentUser: User;
    constructor(public app: AppComponent, private router: Router,
                private authenticationService: AuthService
                ) {
        if(!this.currentUser){
            this.currentUser = (JSON.parse(localStorage.getItem('currentUser')));
        }
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    goToCart(event){
        event.preventDefault();
        this.router.navigate(['cart']);
    }
}
