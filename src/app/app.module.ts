import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPlansComponent } from './components/add-plans/add-plans.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusinessDashboardComponent } from './components/business-dashboard/business-dashboard.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { BusinessDetailsComponent } from './components/business-details/business-details.component';
import { NewBillComponent } from './components/new-bill/new-bill.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { CustomersComponent } from './components/customers/customers.component';
import { PlansComponent } from './components/plans/plans.component';
import { ServicesComponent } from './components/services/services.component';
import { CustomerTransactionsComponent } from './components/customer-transactions/customer-transactions.component';
import { CustomerUpdateDetailsComponent } from './components/customer-update-details/customer-update-details.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AddPlansComponent,
    BusinessDashboardComponent,
    CustomerDashboardComponent,
    BusinessDetailsComponent,
    NewBillComponent,
    TransactionsComponent,
    CustomersComponent,
    PlansComponent,
    ServicesComponent,
    CustomerTransactionsComponent,
    CustomerUpdateDetailsComponent,
    CustomerDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
