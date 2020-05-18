import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {PurchaseDetails} from './models/PurchaseDetails';
//import {AuthenticationService} from './components/login/shared/authentication.service';
import {AuthService} from './auth.service';
import { User } from './models/User';
import {Router} from '@angular/router';
import './components/_content/app.less';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //providers: [ AuthenticationService ]
})
export class AppComponent implements OnInit {
  currentUser: User;
  title = 'yummipizzalorenzotest';
  sidebarActive = false;
  items: MenuItem[];
  purchaseDetails: PurchaseDetails[] =[];

  constructor(
      private router: Router,
      private authenticationService: AuthService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout(event) {
    event.preventDefault();
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {

    if(!this.purchaseDetails.length){
      let purchaseDetails = JSON.parse(localStorage.getItem("purchaseDetails") || "[]");
      if(purchaseDetails && purchaseDetails.length){
        this.purchaseDetails = purchaseDetails;
      }
    }

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-pw pi-home',
        url: 'home'

      },
      {
        label: 'Shopping cart',
        icon: 'pi pi-shopping-cart',
        url: 'cart'
      },
      {
        label: 'My Orders',
        icon: 'pi pi-chart-bar',
        url: 'order'
      }
    ];
  }

  onMenuButtonClick(event: Event) {
    this.sidebarActive = !this.sidebarActive;

    event.preventDefault();
  }
}
