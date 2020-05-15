import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';


import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
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
import {AuthService} from './auth.service';
import {GlobalServices} from './services/global.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, MenuComponent, TopbarComponent, FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, CommonModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule,
    ButtonModule, DialogModule, ToastModule, ConfirmDialogModule, MessagesModule, TabViewModule, CodeHighlighterModule,
      PanelMenuModule, MenubarModule, InputTextModule, SplitButtonModule, TableModule,
      DataViewModule, ScrollPanelModule, DropdownModule, MultiSelectModule, TooltipModule,
    PanelModule, SelectButtonModule
  ],
  providers: [AuthService, GlobalServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
