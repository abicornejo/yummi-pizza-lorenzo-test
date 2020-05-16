import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {PurchaseDetails} from './models/PurchaseDetails';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'yummipizzalorenzotest';
  sidebarActive = false;
  items: MenuItem[];
  purchaseDetails: PurchaseDetails[] =[];

  ngOnInit() {

    let purchaseDetails = JSON.parse(localStorage.getItem("purchaseDetails") || "[]");
    if(purchaseDetails && purchaseDetails.length){
      this.purchaseDetails = purchaseDetails;
    }
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-pw pi-home',
        url: 'home'

      },
      {
        label: 'Shopping Cart',
        icon: 'pi pi-shopping-cart',
        url: 'cart'
      },
      {
        label: 'My Orders',
        icon: 'pi pi-chart-bar',
        url: 'orders'
      }
    ];
  }

  onMenuButtonClick(event: Event) {
    this.sidebarActive = !this.sidebarActive;

    event.preventDefault();
  }
}
