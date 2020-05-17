import {Pizza} from './Pizza';

export interface PurchaseDetails {
    pizza ?: string; //Pizza;
    ingredients ?:string;
    sizeId ?:number;
    sizeDescription ?:string;
    detailId ?:number;
    pizzaId ?: number;
    purchaseId  ?: number;
    quantity ?: number;
    purchasePrice  ?: number;
    amount  ?: number;
    amountEuro  ?: number;
    status  ?: string;
    sizePizzaId  ?: number;
}
