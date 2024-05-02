import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  dbUrl:any = 'https://plan-based-billing-backend.onrender.com';

  constructor(public http:HttpClient) { }

  updateCustomer(mobile:any,details:any){
    return this.http.patch(`${this.dbUrl}/updateCustomerDetails/${mobile}`,details);
  }

  fetchCustomerTransactions(mobile:any){
    return this.http.get(`${this.dbUrl}/getAllTransactionsByCustomer/${mobile}`);
  }
}
