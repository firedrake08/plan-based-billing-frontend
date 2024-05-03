import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  dbUrl:any = 'https://plan-based-billing-backend-hdj3uqfd3a-uc.a.run.app';
  constructor(public http:HttpClient) { }

  updatePlans(bid:any,plans:any){
    return this.http.patch(`${this.dbUrl}/updatePlansById/${bid}`,plans);
  }

  updatePlanByTitle(bid:any,title:any,newPlan:any){
    return this.http.patch(`${this.dbUrl}/updatePlan/${bid}/${title}`,newPlan);
  }

  deletePlanByTitle(bid:any,title:any){
    return this.http.delete(`${this.dbUrl}/deletePlan/${bid}/${title}`);
  }

  updateServices(bid:any,services:any){
    return this.http.patch(`${this.dbUrl}/updateServicesById/${bid}`,services);
  }

  updateServiceByTitle(bid:any,title:any,newService:any){
    return this.http.patch(`${this.dbUrl}/updateService/${bid}/${title}`,newService);
  }

  deleteServiceByTitle(bid:any,title:any){
    return this.http.delete(`${this.dbUrl}/deleteService/${bid}/${title}`);
  }

  addCustomer(customer:any,bId:any){
    return this.http.post(`${this.dbUrl}/addCustomer/${bId}`,customer);
  }

  createPwdForCustomer(mobile:any,password:any){
    return this.http.patch(`${this.dbUrl}/createPassword/${mobile}`,password);
  }

  fetchCustomerDetails(bId:any,mobile:any){
    return this.http.get(`${this.dbUrl}/getCustomerDetails/${bId}/${mobile}`);
  }

  fetchCustomerPlan(bId:any,planTitle:any){
    return this.http.get(`${this.dbUrl}/getPlanByTitle/${bId}/${planTitle}`);
  }

  fetchAllServices(bId:string){
    return this.http.get(`${this.dbUrl}/getServices/${bId}`);
  }

  addInvoice(bId:any,invoice:any){
    return this.http.post(`${this.dbUrl}/addTransaction/${bId}`,invoice);
  }

  getAllCustomers(bId:any){
    return this.http.get(`${this.dbUrl}/getAllCustomersByBusiness/${bId}`);
  }

  getAllTransactions(bId:any){
    return this.http.get(`${this.dbUrl}/getAllTransactionsByBusiness/${bId}`);
  }
}
