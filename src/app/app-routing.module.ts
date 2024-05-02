import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { AddPlansComponent } from './components/add-plans/add-plans.component';
import { BusinessDashboardComponent } from './components/business-dashboard/business-dashboard.component';
import { BusinessDetailsComponent } from './components/business-details/business-details.component';
import { NewBillComponent } from './components/new-bill/new-bill.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { CustomersComponent } from './components/customers/customers.component';
import { PlansComponent } from './components/plans/plans.component';
import { ServicesComponent } from './components/services/services.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustomerTransactionsComponent } from './components/customer-transactions/customer-transactions.component';
import { CustomerUpdateDetailsComponent } from './components/customer-update-details/customer-update-details.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"business-dashboard",
    component:BusinessDashboardComponent,
    children:[
      {
        path:"",
        component:BusinessDetailsComponent
      },
      {
        path:"business-details",
        redirectTo:""
      },
      {
        path:"new-bill",
        component:NewBillComponent
      },
      {
        path:"transactions",
        component:TransactionsComponent
      },
      {
        path:"customers",
        component:CustomersComponent
      },
      {
        path:"plans",
        component:PlansComponent
      },
      {
        path:"services",
        component:ServicesComponent
      },
    ]
  },
  {
    path:"customer-dashboard",
    component:CustomerDashboardComponent,
    children:[
      {
        path:"",
        component:CustomerDetailsComponent
      },
      {
        path:"customer-details",
        redirectTo:""
      },
      {
        path:"transactions",
        component:CustomerTransactionsComponent
      },
      {
        path:"update-details",
        component:CustomerUpdateDetailsComponent
      }
    ]
  },
  {
    path:"addPlans",
    component:AddPlansComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
