import { Component } from '@angular/core';
import {Pizza} from './../../models/Pizza';
import {GlobalServices} from './../../services/global.service';
import {LazyLoadEvent} from 'primeng';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    pizzas: Pizza[];
    datasource: Pizza[];
    rowsCounter: 0;
    constructor(private  _service: GlobalServices) {}

    listPizza(event: LazyLoadEvent) {
        const parameters = {
            method: 'GET',
            urlMethod: 'pizza',
            callBack: null,
            params: { }
        };
        this.getPizza(parameters);
    }

    getPizza(parameters) {
        this._service.callApiRest(parameters).then(records => {
            // @ts-ignore
            this.datasource = records.data;
            // @ts-ignore
            this.rowsCounter = records.total;

            this.pizzas = this.datasource;

        }).catch((error: any) => {

        });
    }

}
