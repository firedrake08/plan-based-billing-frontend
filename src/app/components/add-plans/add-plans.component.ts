import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BusinessService } from 'src/app/services/business.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-plans',
  templateUrl: './add-plans.component.html',
  styleUrls: ['./add-plans.component.scss'],
})
export class AddPlansComponent implements OnInit {
  plansForm: FormGroup;
  customerForm: FormGroup;
  addServiceForm: FormGroup;
  fetchCustomerForm: FormGroup;
  generateInvoiceForm: FormGroup;
  currentBusiness: any;
  modalRef?: BsModalRef;
  customerDetails: any = null;
  totalPrice: number = 0;
  finalPrice: number = 0;
  currentCustomerPlan: any = null;
  allServices: any = [];
  allCustomers: any = [];
  allTransactions: any = [];
  filteredTransactions: any = [];
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public bizService: BusinessService,
    public router: Router,
    private modalService: BsModalService
  ) {
    this.plansForm = this.fb.group({
      plans: this.fb.array([]),
    });
    this.customerForm = this.fb.group({
      mobile: [''],
      plan: [''],
    });
    this.addServiceForm = this.fb.group({
      services: this.fb.array([
        this.fb.group({
          title: [''],
          price: [''],
        }),
      ]),
    });

    this.fetchCustomerForm = this.fb.group({
      mobile: [''],
    });

    this.generateInvoiceForm = this.fb.group({
      custServices: new FormArray([]),
    });
  }

  ngOnInit(): void {
    if (this.authService.currentBusiness) {
      this.currentBusiness = this.authService.currentBusiness;
    } else {
      this.authService.currentBusiness = JSON.parse(
        window.localStorage.getItem('currentBusiness') as string
      );
      this.currentBusiness = this.authService.currentBusiness;
    }
  }

  getUpdatedBusiness() {
    this.authService
      .businessLogin(this.currentBusiness)
      .subscribe((res: any) => {
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

  get plans() {
    return this.plansForm.get('plans') as FormArray;
  }

  get services() {
    return this.addServiceForm.get('services') as FormArray;
  }

  addPlan() {
    let plan = this.fb.group({
      title: [''],
      discount: [''],
      price: [''],
    });
    this.plans.push(plan);
  }

  savePlans() {
    this.bizService
      .updatePlans(this.currentBusiness._id, this.plansForm.value)
      .subscribe((res) => {
        alert(`Plans updated for ${this.currentBusiness.businessName}`);
        this.plansForm.reset();
        this.plans.clear();
        this.getUpdatedBusiness();
      });
  }

  addService() {
    let service = this.fb.group({
      title: [''],
      price: [''],
    });
    this.services.push(service);
  }

  saveServices() {
    this.bizService
      .updateServices(this.currentBusiness._id, this.addServiceForm.value)
      .subscribe((res) => {
        alert(`Services updated for ${this.currentBusiness.businessName}`);
        this.addServiceForm.reset();
        this.services.clear();
      });
  }

  closeAddServiceModal() {
    this.modalRef?.hide();
    this.addServiceForm.reset();
    this.services.clear();
    this.addService();
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
    console.log(userServices.value)
    console.log(this.generateInvoiceForm.value.custServices)
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

  saveCustomer() {
    this.bizService
      .addCustomer(this.customerForm.value, this.currentBusiness._id)
      .subscribe((res) => {
        alert(`Customer ${res} added successfully`);
        this.closeAddCustomerModal();
      });
  }

  openAddServiceModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openAddCustomerModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeAddCustomerModal() {
    this.modalRef?.hide();
    this.customerForm.reset();
  }

  openGenerateInvoiceModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getCustomerDetails() {
    this.bizService
      .fetchCustomerDetails(
        this.currentBusiness._id,
        this.fetchCustomerForm.value.mobile
      )
      .subscribe((res: any) => {
        console.log(res);
        if (res[0].customers.length) {
          this.customerDetails = res[0].customers[0];
          console.log(this.customerDetails);
          this.bizService
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
            });
        }
        else{
          alert("No customers found with this mobile number");
        }
      });
  }

  generateInvoice() {
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
        this.closeGenerateInvoiceModal();
      });
  }

  closeGenerateInvoiceModal() {
    this.modalRef?.hide();
    this.fetchCustomerForm.reset();
    this.generateInvoiceForm.reset();
    this.customerDetails = null;
    this.allServices = [];
    this.currentCustomerPlan = null;
  }

  fetchAllCustomers() {
    this.bizService
      .getAllCustomers(this.currentBusiness._id)
      .subscribe((res: any) => {
        this.allCustomers = res[0].customers;
      });
  }

  fetchAllTransactions() {
    this.bizService
      .getAllTransactions(this.currentBusiness._id)
      .subscribe((res: any) => {
        this.allTransactions = res[0].transactions;
        this.filteredTransactions = this.allTransactions;
      });
  }

  handleDateChange(dateRange: any) {
    console.log(this.allTransactions[0].date);
    console.log(typeof this.allTransactions[0].date);
    console.log(dateRange[0]);
    console.log(typeof dateRange[0]);
    this.filteredTransactions = this.allTransactions.filter(
      (transaction: any) => {
        return (
          transaction.date >= dateRange[0].getTime() &&
          transaction.date <= dateRange[1].getTime()
        );
      }
    );
  }

  logout() {
    this.authService.currentBusiness = null;
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }
}
