import { BusinessService } from './../../services/business.service';
import { Component, OnInit,TemplateRef  } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  businessForm:FormGroup;
  customerLoginForm:FormGroup;
  isCustomerLoggedIn:boolean = false;
  customerPwdForm:FormGroup;
  bizLoginRegisterToggle:boolean = true;
  loading:boolean = false;
  constructor(public authService: AuthService,public bizService:BusinessService,public fb:FormBuilder,public router:Router) {
    this.loginForm = this.fb.group({
      primaryMobile:[''],
      password:['']
    })

    this.businessForm = this.fb.group({
      businessName:[''],
      primaryMobile:[''],
      email:[''],
      password:['']
    })

    this.customerLoginForm = this.fb.group({
      mobile:['']
    })

    this.customerPwdForm = this.fb.group({
      password:['']
    })
  }

  ngOnInit(): void {
  }

  toggleLoginRegister(){
    this.bizLoginRegisterToggle = !this.bizLoginRegisterToggle;
  }

  businessLogin(){
    this.loading = true;
    this.authService.businessLogin(this.loginForm.value).subscribe((res:any)=>{
      this.loading = false;
      if(res.length){
        alert('login successful');
        window.localStorage.setItem('currentBusiness',JSON.stringify(res[0]));
        this.authService.currentBusiness = res[0];
          this.router.navigate(['/business-dashboard']);
      }
      else{
        alert("Invalid credentials")
      }
    })
  }

  registerBusiness(){
    this.loading = true;
    this.authService.registerBusiness(this.businessForm.value).subscribe((res)=>{
      this.loading = false;
      alert(`${res} added successfully`);
      this.router.navigate(['/login'])
    })
  }

  customerLogin(){
    this.loading = true;
    this.authService.customerLogin(this.customerLoginForm.value).subscribe((res:any)=>{
      this.loading = false;
      if(res.length){
        if(!res[0].password){
          this.isCustomerLoggedIn = true;
        }
        else{
          window.localStorage.setItem('currentCustomer',JSON.stringify(res[0]));
        this.authService.currentCustomer = res[0];
          this.router.navigate(['/customer-dashboard']);
        }
      }
      else{
        alert("Invalid credentials")
      }
    })
  }

  createPassword(){
    this.loading = true;
    this.bizService.createPwdForCustomer(this.customerLoginForm.value.mobile,this.customerPwdForm.value).subscribe((res:any)=>{
      this.loading = false;
      alert('Password added successfully');
      window.localStorage.setItem('currentCustomer',JSON.stringify(res[0]));
        this.authService.currentCustomer = res;
      this.router.navigate(['/customer-dashboard']);
    })
  }
}
