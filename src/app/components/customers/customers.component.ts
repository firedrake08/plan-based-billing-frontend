import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  currentBusiness: any;
  showCustomerForm:boolean = false;
  customerForm: FormGroup;
  loading:boolean = false;
  constructor(public authService: AuthService,public fb: FormBuilder,public bizService: BusinessService,) {
    this.customerForm = this.fb.group({
      mobile: ['',Validators.required],
      plan: ['',Validators.required],
    });
   }

  ngOnInit(): void {
    this.currentBusiness = this.authService.currentBusiness;
  }

  addCustomer(){
    this.showCustomerForm = true;
  }

  saveCustomer() {
    this.loading = true;
    this.bizService
      .addCustomer(this.customerForm.value, this.currentBusiness._id)
      .subscribe((res) => {
        alert(`Customer ${res} added successfully`);
        this.customerForm.reset();
        this.showCustomerForm = false;
        this.getUpdatedBusiness();
      });
  }

  getUpdatedBusiness() {
    this.authService
      .businessLogin(this.currentBusiness)
      .subscribe((res: any) => {
        this.loading = false;
        if (res.length) {
          window.localStorage.setItem(
            'currentBusiness',
            JSON.stringify(res[0])
          );
          this.currentBusiness = this.authService.currentBusiness = res[0];
        } else {
          alert('Invalid credentials');
        }
      });
  }

}
