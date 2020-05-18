import {Component, OnInit} from '@angular/core';
import { AppComponent } from './../../app.component';
import {Router} from '@angular/router';

import {Purchase} from './../../models/Purchase';
import {PurchaseDetails} from './../../models/PurchaseDetails';
import {LazyLoadEvent} from 'primeng';
import {GlobalServices} from '../../services/global.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit{
    constructor(public app: AppComponent, private router: Router, private  _service: GlobalServices) { }

    ngOnInit(): void {
        if(!this.app.purchaseDetails.length){
            let purchaseDetails = JSON.parse(localStorage.getItem("purchaseDetails") || "[]");
            if(purchaseDetails && purchaseDetails.length){
                this.app.purchaseDetails = purchaseDetails.concat();
            }
        }
    }
    expanded : false;
    orders : Purchase[]=[];
    pizzas : PurchaseDetails[]=[];
    dataSource : Purchase[];
    dataSourcePizza : PurchaseDetails[];
    orderSelected : Purchase = {};
    totalRows: 0;
    totalRowsPizza = 0;
    montOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Dic'];


    fetchInfo(event: LazyLoadEvent){
        const user = JSON.parse(localStorage.getItem("currentUser") || null);

        let parameters = {
            method: 'GET',
            urlMethod: `getOrdersByClient/${user.id}`,
            callBack: null,
            params: {
                skip: event.first,
                take: event.rows,
                search: event.globalFilter
            }
        };
        this._service.callApiRest(parameters).then(records => {
            // @ts-ignore
            this.dataSource = records.data;
            // @ts-ignore
            this.totalRows = records.data.length;

            this.orders = this.dataSource;

        }).catch((error: any) => {

        });
    }

    fetchPizzas(event: LazyLoadEvent){

        let parameters = {
            method: 'GET',
            urlMethod: `getDetailByOrderId/${this.orderSelected.purchaseId}`,
            callBack: null,
            params: {
                skip: event.first,
                take: event.rows,
                search: event.globalFilter
            }
        };
        this._service.callApiRest(parameters).then(records => {
            // @ts-ignore
            this.dataSourcePizza = records.data;
            // @ts-ignore
            this.totalRowsPizza = records.data.length;

            this.pizzas = this.dataSourcePizza;

        }).catch((error: any) => {

        });
    }

    forMatCustomDate(date) {
        let hour = date.split(' ')[1];
        date = date.split(' ')[0];

        let dd = date.split('-')[2];
        let mm = this.montOfYear[parseInt(date.split('-')[1]) -1];
        let yyyy = date.split('-')[0];

        if (parseInt(dd) < 10 && dd.toString().length === 1) {
            dd = '0' + dd;
        }


        return dd + '-' + mm + '-' + yyyy;
    }

}
