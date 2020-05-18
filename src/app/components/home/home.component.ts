import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Pizza} from './../../models/Pizza';
import {PurchaseDetails} from './../../models/purchaseDetails';
import {SizePizza} from './../../models/SizePizza';
import {GlobalServices} from './../../services/global.service';
import {ConfirmationService, LazyLoadEvent, MessageService, SelectItem} from 'primeng/api';
import { AppComponent } from './../../app.component';
import {Router} from '@angular/router';
import {AuthService} from './../../auth.service';
import {User} from '../../models';
import {BehaviorSubject} from 'rxjs';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    providers: [ConfirmationService, MessageService]
})
export class HomeComponent implements OnInit{
    pizzas: Pizza[]=[];
    sizePizza: SizePizza[];
    sizePizzaSelected: SizePizza;
    pizzaSelected: Pizza;
    quantity: number = 1;
    dynamicPrice: number =0;
    dynamicPriceEuro: number =0;
    dataSource: Pizza[];
    types: SelectItem[] = [];
    ingredients: SelectItem[] = [];
    purchaseDetails: PurchaseDetails = {};
    selectedType: string = '';//SelectItem;
    rowsCounter: 0;
    ingredientByComma: string;
    displayOrderDialog = false;
    currentUser: User;
    constructor(private  _service: GlobalServices, public _app: AppComponent,
                private _confirmService: ConfirmationService,
                private _mesgService: MessageService,
                private _router: Router,
                private cd: ChangeDetectorRef,
                private authenticationService: AuthService
                ) {

        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
    ngOnInit(){


        if(!this._app.purchaseDetails.length){
            let purchaseDetails = JSON.parse(localStorage.getItem("purchaseDetails") || "[]");
            if(purchaseDetails && purchaseDetails.length){
                this._app.purchaseDetails = purchaseDetails.concat();;
            }
        }

        if(!this.pizzas.length){
            let pizzasFromLocal = JSON.parse(localStorage.getItem("pizzas") || "[]");
            if(pizzasFromLocal && pizzasFromLocal.length){
                this.pizzas = pizzasFromLocal.concat();;
            }
        }

    }

    ngOnDestroy() {
        //this.eventListener.unsubscribe();
    }

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
        const pizzasFromLocal = JSON.parse(localStorage.getItem("pizzas") || "[]");

        if(pizzasFromLocal && pizzasFromLocal.length){
            this.dataSource = pizzasFromLocal;
            // @ts-ignore
            this.rowsCounter = pizzasFromLocal.length;
            this.pizzas = this.dataSource;
        }else{
            this._service.callApiRest(parameters).then(records => {
                // @ts-ignore
                this.dataSource = records.data;
                // @ts-ignore
                this.rowsCounter = records.total;
                localStorage.setItem("pizzas", JSON.stringify(this.dataSource));
                this.pizzas = this.dataSource;

            }).catch((error: any) => {

            });
        }

    }
    change(event){
        this.sizePizzaSelected = this.sizePizza.find( item => item.sizePizzaId === event.option.value) ;
        this.quantity = 1;
        this.dynamicPrice = this.sizePizzaSelected.price * this.quantity;
        this.dynamicPriceEuro = this.sizePizzaSelected.euroPrice * this.quantity;
    }

    spinnerChanged(event){
        this.dynamicPrice = this.sizePizzaSelected.price * this.quantity;
        this.dynamicPriceEuro = this.sizePizzaSelected.euroPrice * this.quantity;
    }

    orderPizza(pizza: Pizza){
        // this.sizePizza = [];
        // this.sizePizzaSelected = {};
        this.purchaseDetails = {};
        this.quantity = 1;
        this.types = [];
       // this.selectedType = {};
        const parameters = {
            method: 'GET',
            urlMethod: `getSizesByPizzaId/${pizza.pizzaId}`,
            callBack: null,
            params: { }
        };
        this.pizzaSelected = pizza;
        const self = this;
        this._service.callApiRest(parameters).then(records => {
            // @ts-ignore
            records.data.map(record =>{
                self.types.push({ label: `${record.name}`  , value: record.sizePizzaId});
            });
            // @ts-ignore
            this.sizePizza = records.data;
            this.sizePizzaSelected = this.sizePizza[0];
            this.selectedType = this.types[0].value;
            this.dynamicPrice = (this.sizePizzaSelected.price) * (this.quantity);
            this.dynamicPriceEuro = (this.sizePizzaSelected.euroPrice) * (this.quantity);
            this.displayOrderDialog = true;
            //this.getIngredientsByPizza(pizza);
        }).catch((error: any) => {

        });

    }

    // getIngredientsByPizza(pizza: Pizza){
    //     const parameters = {
    //         method: 'GET',
    //         urlMethod: `getIngredientsByPizzaId/${pizza.pizzaId}`,
    //         callBack: null,
    //         params: { }
    //     };
    //     this._service.callApiRest(parameters).then(records => {
    //         // @ts-ignore
    //         if(records && records.data){
    //             // @ts-ignore
    //             this.ingredients = records.data;
    //             // @ts-ignore
    //             let tmp = records.data.map(record =>{
    //                 return record.label;
    //             });
    //             this.ingredientByComma =tmp.join(',');
    //             this.displayOrderDialog = true;
    //         }
    //
    //     }).catch((error: any) => {
    //
    //     });
    // }

    addToCar(event){
        this.purchaseDetails.pizzaId = this.pizzaSelected.pizzaId;
        this.purchaseDetails.ingredients = this.pizzaSelected.ingredients;
        this.purchaseDetails.pizza = this.pizzaSelected.name;
        this.purchaseDetails.purchasePrice = this.sizePizzaSelected.price;
        this.purchaseDetails.amount = this.dynamicPrice;
        this.purchaseDetails.amountEuro = this.dynamicPriceEuro;
        this.purchaseDetails.quantity = this.quantity;
        this.purchaseDetails.sizePizzaId = this.sizePizzaSelected.sizePizzaId;
        this.purchaseDetails.sizeDescription = this.sizePizzaSelected.name;
        this._app.purchaseDetails.push(this.purchaseDetails);
        this.displayOrderDialog = false;

        localStorage.setItem("purchaseDetails", JSON.stringify(this._app.purchaseDetails));

        this.goToShoppingCart();
    }


    goToShoppingCart() {
        setTimeout(()=>{
            this._confirmService.confirm({
                message: `¿Do you want to go to your shopping cart?`,
                header: 'Question',
                accept: () => {
                    setTimeout(()=> {
                        this._router.navigate(['cart']);
                    },1000);
                }
            });
        },1000);

    }
}
