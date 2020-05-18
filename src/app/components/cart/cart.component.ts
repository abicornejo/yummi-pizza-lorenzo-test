import {Component, OnInit} from '@angular/core';
import { AppComponent } from './../../app.component';
import {GlobalServices} from '../../services/global.service';
import {ConfirmationService, MessageService} from 'primeng';
import {Router} from '@angular/router';
@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit{
    constructor(private  _service: GlobalServices, public _app: AppComponent,
                private _confirmService: ConfirmationService,
                private _mesgService: MessageService,
                private _router: Router) {

    }
    subTotalAmount: number = 0;
    totalAmount: number = 0;
    costToDelivery: number = 30;
    ngOnInit() {
        //this.costToDelivery = 30;
        if(!this._app.purchaseDetails.length){
            let purchaseDetails = JSON.parse(localStorage.getItem("purchaseDetails") || "[]");
            if(purchaseDetails && purchaseDetails.length){
                this._app.purchaseDetails = purchaseDetails.concat();
            }
        }
        if(this._app.purchaseDetails && this._app.purchaseDetails.length){
            this.subTotalAmount = this._app.purchaseDetails.reduce((tot,item) =>{
                return tot + item.amount;
            },0);

            this.totalAmount = this.subTotalAmount + this.costToDelivery;
        }

    }
    purchase(event){
        let user = JSON.parse(localStorage.getItem("currentUser") || null);

        const payment = {
            paymentAmount : this.totalAmount,
            subtotal: this.subTotalAmount,
            costDelivery : this.costToDelivery

        }
        const purchase = {
            clientId : user.id || null,
            paymentId : null,
            purchaseAmount : this.totalAmount,
            subtotal: this.subTotalAmount,
            costDelivery : this.costToDelivery
        }
        const parameters = {
            method: 'POST',
            urlMethod: 'purchasePizza',
            callBack: null,
            params: {
                payment : payment,
                purchase : purchase,
                purchaseDetail : this._app.purchaseDetails
            }
        };
        this._service.callApiRest(parameters).then(records => {
            // @ts-ignore
            if(records && records.success){
                // @ts-ignore
                let options = {severity: 'success', sticky: false, summary: 'Order successfully', detail:records.msg};
                // @ts-ignore
                if(records.success === 'ERROR'){
                    options.severity = 'error';
                    options.summary = 'Error';
                }else{
                    localStorage.setItem("purchaseDetails", '[]');
                    this._app.purchaseDetails = [];
                    this._router.navigate(['order']);
                }
                this._mesgService.add(options);
            }
        }).catch((error: any) => {

        });
    }
}
