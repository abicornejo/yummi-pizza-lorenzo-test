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

    totalAmount: number = 0;
    ngOnInit() {
        if(!this._app.purchaseDetails.length){
            let purchaseDetails = JSON.parse(localStorage.getItem("purchaseDetails") || "[]");
            if(purchaseDetails && purchaseDetails.length){
                this._app.purchaseDetails = purchaseDetails.concat();
            }
        }

        this.totalAmount = this._app.purchaseDetails.reduce((tot,item) =>{
           return tot + item.amount;
        },0);
    }
    purchase(){
        let user = JSON.parse(localStorage.getItem("currentUser") || null);

        const payment = {
            paymentAmount : this.totalAmount
        }
        const purchase = {
            clientId : user.id || null,
            paymentId : null,
            purchaseAmount : this.totalAmount
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
                let options = {severity: 'success', sticky: true, summary: 'Exito', detail:records.msg};
                // @ts-ignore
                if(records.success === 'ERROR'){
                    options.severity = 'error';
                    options.summary = 'Error';
                }else{
                    localStorage.setItem("purchaseDetails", '[]');
                    this._app.purchaseDetails = [];
                    this._router.navigate(['home']);
                }
                this._mesgService.add(options);
            }
        }).catch((error: any) => {

        });
    }
}
