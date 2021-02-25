import { CalendarModule } from 'primeng/calendar';
import {MultiSelectModule} from 'primeng/multiselect';
import { DataTableModule } from './shared/modules/data-table/data-table.module';
import { DashboardModule } from './dashboard/dashboard.module';


import { SharedModule } from './shared/shared.module';
import { Principal } from './principal.service';
import { AccountService } from './account.service';
import { AuthService } from './auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule ,ReactiveFormsModule
} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './signup/signup.component';
import { AuthServerProvider } from './auth-session.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TopNavComponent } from './top-nav/top-nav.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/dropdown';



@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    TopNavComponent,
    // DashboardComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule,
    DashboardModule,
    DataTableModule,
    CalendarModule,
    MultiSelectModule,
    BrowserAnimationsModule,
    DropdownModule
  ],
  providers: [AuthService, AuthServerProvider, Principal, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
