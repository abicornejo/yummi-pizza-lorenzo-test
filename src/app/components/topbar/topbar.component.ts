import { Component } from '@angular/core';
import { AppComponent } from './../../app.component';
@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html'
})
export class TopbarComponent {
    constructor(public app: AppComponent) { }
}
