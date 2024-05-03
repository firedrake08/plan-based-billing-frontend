import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  dbUrl:any = 'https://plan-based-billing-backend-hdj3uqfd3a-uc.a.run.app';
  currentBusiness:any|null = null;
  currentCustomer:any|null = null;
  constructor(public http:HttpClient) {}

  registerBusiness(newBusiness:any){
    return this.http.post(`${this.dbUrl}/addBusinessAccount`,newBusiness);
  }

  businessLogin(business:any){
    return this.http.post(`${this.dbUrl}/getBusiness`,business);
  }

  customerLogin(customer:any){
    return this.http.post(`${this.dbUrl}/getCustomer`,customer)
  }
}
