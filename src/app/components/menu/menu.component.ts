import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
// import { MenuItem, ScrollPanel } from 'primeng/primeng';
import { AppComponent } from './../../app.component';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit, AfterViewInit {
    // @ViewChild('scrollPanel') layoutMenuScrollerViewChild: ScrollPanel;

    constructor(public app: AppComponent) { }

    ngAfterViewInit() {
        // setTimeout(() => { this.layoutMenuScrollerViewChild.moveBar(); }, 100);
    }

    ngOnInit() {
    }
}
