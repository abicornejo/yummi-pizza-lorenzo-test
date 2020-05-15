import { Component } from '@angular/core';
import {Pizza} from './../../models/Pizza';
import {SizePizza} from './../../models/SizePizza';
import {GlobalServices} from './../../services/global.service';
import {LazyLoadEvent, SelectItem} from 'primeng';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    pizzas: Pizza[];
    sizePizza: SizePizza[];
    sizePizzaSelected: SizePizza;
    pizzaSelected : Pizza;
    dataSource: Pizza[];
    types: SelectItem[] = [];
    ingredients: SelectItem[] = [];
    selectedType: string;
    rowsCounter: 0;
    ingredientByComma: string;
    displayOrderDialog = false;
    constructor(private  _service: GlobalServices) {
        // this.types =SelectItem[];
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
        this._service.callApiRest(parameters).then(records => {
            // @ts-ignore
            this.dataSource = records.data;
            // @ts-ignore
            this.rowsCounter = records.total;

            this.pizzas = this.dataSource;

        }).catch((error: any) => {

        });
    }
    change(event){
        this.sizePizzaSelected = this.sizePizza.find( item => item.sizePizzaId === event.option.value) ;

    }
    orderPizza(pizza: Pizza){
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
                self.types.push({ label: record.name , value: record.sizePizzaId});
            });
            // @ts-ignore
            this.sizePizza = records.data;
           this.getIngredientsByPizza(pizza);
        }).catch((error: any) => {

        });

    }

    getIngredientsByPizza(pizza: Pizza){
        const parameters = {
            method: 'GET',
            urlMethod: `getIngredientsByPizzaId/${pizza.pizzaId}`,
            callBack: null,
            params: { }
        };
        this._service.callApiRest(parameters).then(records => {
            // @ts-ignore
            this.ingredients = records.data;
            // @ts-ignore
            let tmp = records.data.map(record =>{
                return record.label;
            });
            this.ingredientByComma =tmp.join(',');
            this.displayOrderDialog = true;
        }).catch((error: any) => {

        });
    }

}
