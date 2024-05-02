import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BusinessService } from 'src/app/services/business.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.scss'],
})
export class NewBillComponent implements OnInit {
  currentBusiness: any;
  fetchCustomerForm: FormGroup;
  generateInvoiceForm: FormGroup;
  customerDetails: any = null;
  allServices: any = [];
  currentCustomerPlan: any = null;
  totalPrice: number = 0;
  finalPrice: number = 0;
  loading:boolean = false;
  constructor(
    public authService: AuthService,
    public fb: FormBuilder,
    public bizService: BusinessService
  ) {
    this.fetchCustomerForm = this.fb.group({
      mobile: ['', Validators.required],
    });

    this.generateInvoiceForm = this.fb.group({
      custServices: new FormArray([]),
    });
  }

  ngOnInit(): void {
    this.currentBusiness = this.authService.currentBusiness;
  }

  getCustomerDetails() {
    this.loading = true;
    this.bizService
      .fetchCustomerDetails(
        this.currentBusiness._id,
        this.fetchCustomerForm.value.mobile
      )
      .subscribe((res: any) => {
        if (res[0].customers.length) {
          this.customerDetails = res[0].customers[0];
          const fetchServices = this.bizService.fetchAllServices(
            this.currentBusiness._id
          );
          const fetchCustomerPlan = this.bizService.fetchCustomerPlan(
            this.currentBusiness._id,
            this.customerDetails.plan
          );
          forkJoin([fetchServices, fetchCustomerPlan]).subscribe(
            ([services, customerPlan]:any) => {
              this.allServices = services[0].services;
              this.currentCustomerPlan = customerPlan[0].plans[0];
              this.loading = false;
            }
          );
        } else {
          this.loading = false;
          alert('No customers found with this mobile number');
        }
      });
  }

  handleCheckbox(event: any) {
    let userServices = this.generateInvoiceForm.get(
      'custServices'
    ) as FormArray;
    if (event.target.checked) {
      userServices.push(new FormControl(event.target.value));
    } else {
      userServices.controls.forEach((ctrl: any, i: any) => {
        if (ctrl.value === event.target.value) {
          userServices.removeAt(i);
          return;
        }
      });
    }
    console.log(this.generateInvoiceForm.value.custServices);
    this.totalPrice = this.allServices.reduce((acc: any, serv: any) => {
      if (
        this.generateInvoiceForm.value.custServices.some((cs: any) => {
          return serv.title === cs;
        })
      ) {
        return acc + parseInt(serv.price);
      } else {
        return acc;
      }
    }, 0);
    let discountAmount =
      (+this.currentCustomerPlan.discount / 100) * this.totalPrice;
    this.finalPrice = this.totalPrice - discountAmount;
  }

  generateInvoice() {
    this.loading = true;
    let generatedInvoice: any = {};
    generatedInvoice.date = new Date().getTime();
    generatedInvoice.customerMobile = this.customerDetails.mobile;
    generatedInvoice.plan = this.customerDetails.plan;
    generatedInvoice.availedServices =
      this.generateInvoiceForm.value.custServices;
    generatedInvoice.totalBill = this.totalPrice;
    generatedInvoice.finalBill = this.finalPrice;
    this.bizService
      .addInvoice(this.currentBusiness._id, generatedInvoice)
      .subscribe((res) => {
        alert(`Invoice of amount ${res} successfully added`);
        this.fetchCustomerForm.reset();
        this.generateInvoiceForm.reset();
        this.customerDetails = null;
        this.allServices = [];
        this.currentCustomerPlan = null;
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



/* this.bizService
            .fetchAllServices(this.currentBusiness._id)
            .subscribe((services: any) => {
              this.allServices = services[0].services;
            });
          this.bizService
            .fetchCustomerPlan(
              this.currentBusiness._id,
              this.customerDetails.plan
            )
            .subscribe((res: any) => {
              this.currentCustomerPlan = res[0].plans[0];
            }); */
