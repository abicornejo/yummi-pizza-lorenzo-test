import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { JwtInterceptor } from './components/_helpers';


import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {PanelMenuModule} from 'primeng/panelmenu';
import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import {SplitButtonModule} from 'primeng/splitbutton';
import {TableModule} from 'primeng/table';
import {DataViewModule} from 'primeng/dataview';
import {ScrollPanelModule } from 'primeng/scrollpanel';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {TooltipModule} from 'primeng/tooltip';
import {PanelModule} from 'primeng/panel';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SpinnerModule} from 'primeng/spinner';
import {FullCalendarModule} from 'primeng/fullcalendar';
import {ChartModule} from 'primeng/chart';
import {EditorModule} from 'primeng/editor';
import {ToolbarModule} from 'primeng/toolbar';
import {PasswordModule} from 'primeng/password';


import {AuthService} from './auth.service';
import {GlobalServices} from './services/global.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { RegisterComponent } from './components/register';
import { AlertComponent } from './components/_components';
import { OrdersComponent } from './components/orders/orders.component';
import {LoadingScreenInterceptor} from './components/_helpers/loading.interceptor';

import {LoadingScreenComponent} from './components/loading-screen/loading-screen.component';
import {LoadingScreenService} from './services/loading-screen.service';
//import {AlertComponent} from './components/_components/alert.component';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, MenuComponent, TopbarComponent, FooterComponent,
    HomeComponent, CartComponent, RegisterComponent, AlertComponent, OrdersComponent,
    LoadingScreenComponent

  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, CommonModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule,
    ButtonModule, DialogModule, ToastModule, ConfirmDialogModule, MessagesModule, TabViewModule, CodeHighlighterModule,
      PanelMenuModule, MenubarModule, InputTextModule, SplitButtonModule, TableModule,
      DataViewModule, ScrollPanelModule, DropdownModule, MultiSelectModule, TooltipModule,
    PanelModule, SelectButtonModule, SpinnerModule, FullCalendarModule, ChartModule, EditorModule,
    PasswordModule, ToolbarModule
  ],
  providers: [AuthService, GlobalServices, ConfirmationService, MessageService, LoadingScreenService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingScreenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
