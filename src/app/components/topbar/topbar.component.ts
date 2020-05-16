import { Component } from '@angular/core';
import { AppComponent } from './../../app.component';
import {Router} from '@angular/router';
@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html'
})
export class TopbarComponent {
    constructor(public app: AppComponent, private router: Router) { }

    goToCart(event){
        this.router.navigate(['cart']);
    }
}
