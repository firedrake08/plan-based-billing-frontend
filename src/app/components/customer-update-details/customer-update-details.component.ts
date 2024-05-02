import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-update-details',
  templateUrl: './customer-update-details.component.html',
  styleUrls: ['./customer-update-details.component.scss'],
})
export class CustomerUpdateDetailsComponent implements OnInit {
  currentCustomer: any;
  customerUpdateForm: FormGroup;
  loading:boolean = false;

  constructor(
    public authService: AuthService,
    public fb: FormBuilder,
    public custService: CustomerService
  ) {
    this.customerUpdateForm = this.fb.group({
      mobile: ['', Validators.required],
      password: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.currentCustomer = this.authService.currentCustomer;
    this.customerUpdateForm.get('mobile')?.disable();
    this.customerUpdateForm.get('password')?.disable();
    this.setCustomerMobileAndPassword();
  }

  setCustomerMobileAndPassword() {
    this.customerUpdateForm
      .get('mobile')
      ?.setValue(this.currentCustomer.mobile);
    this.customerUpdateForm
      .get('password')
      ?.setValue(this.currentCustomer.password);
    this.customerUpdateForm
      .get('fullname')
      ?.setValue(this.currentCustomer.fullname);
    this.customerUpdateForm
      .get('email')
      ?.setValue(this.currentCustomer.email);
    this.customerUpdateForm
      .get('address')
      ?.setValue(this.currentCustomer.address);
  }

  updateCustomerDetails() {
    this.loading = true;
    this.custService
      .updateCustomer(
        this.currentCustomer.mobile,
        this.customerUpdateForm.value
      )
      .subscribe((res: any) => {
        alert(`Customer ${res.mobile} updated successfully`);
        this.customerUpdateForm.reset();
        this.getUpdatedCustomer();
      });
  }

  getUpdatedCustomer() {
    this.authService
      .customerLogin({ mobile: this.currentCustomer.mobile })
      .subscribe((res: any) => {
        this.loading = false;
        if (res.length) {
          window.localStorage.setItem(
            'currentCustomer',
            JSON.stringify(res[0])
          );
          this.currentCustomer = this.authService.currentCustomer = res[0];
          this.setCustomerMobileAndPassword();
        } else {
          alert('Invalid credentials');
        }
      });
  }
}
