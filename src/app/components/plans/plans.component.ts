import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusinessService } from 'src/app/services/business.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
  currentBusiness: any;
  plansForm: FormGroup;
  updatePlanForm: FormGroup;
  planToBeUpdated: any = null;
  modalRef?: BsModalRef;
  loading:boolean = false;
  constructor(
    public authService: AuthService,
    public fb: FormBuilder,
    public bizService: BusinessService,
    private modalService: BsModalService
  ) {
    this.plansForm = this.fb.group({
      plans: this.fb.array([]),
    });

    this.updatePlanForm = this.fb.group({
      title: ['', Validators.required],
      discount: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.currentBusiness = this.authService.currentBusiness;
  }

  get plans() {
    return this.plansForm.get('plans') as FormArray;
  }

  addPlan() {
    let plan = this.fb.group({
      title: ['', Validators.required],
      discount: ['', Validators.required],
      price: ['', Validators.required],
    });
    this.plans.push(plan);
    console.log(this.plansForm);
  }

  removePlan(ind: number) {
    this.plans.removeAt(ind);
  }

  savePlans() {
    this.loading = true;
    this.bizService
      .updatePlans(this.currentBusiness._id, this.plansForm.value)
      .subscribe((res) => {
        alert(`Plans updated for ${this.currentBusiness.businessName}`);
        this.plansForm.reset();
        this.plans.clear();
        this.getUpdatedBusiness();
      });
  }

  openUpdatePlanModal(template: TemplateRef<any>, planObj: any) {
    this.modalRef = this.modalService.show(template);
    this.planToBeUpdated = planObj;
    this.updatePlanForm.get('title')?.setValue(planObj.title);
    this.updatePlanForm.get('discount')?.setValue(planObj.discount);
    this.updatePlanForm.get('price')?.setValue(planObj.price);
  }

  updatePlan() {
    this.loading = true;
    this.bizService
      .updatePlanByTitle(
        this.currentBusiness._id,
        this.planToBeUpdated.title,
        this.updatePlanForm.value
      )
      .subscribe((res) => {
        this.closeUpdatePlanModal();
        this.getUpdatedBusiness();
      });
  }

  closeUpdatePlanModal() {
    this.modalRef?.hide();
    this.updatePlanForm.reset();
    this.planToBeUpdated = null;
  }

  deletePlan(title: any) {
    let delConfirm = window.confirm(
      'Are you sure you want to delete this plan?'
    );
    if (delConfirm) {
      this.loading = true;
      this.bizService
        .deletePlanByTitle(this.currentBusiness._id, title)
        .subscribe((res) => {
          this.getUpdatedBusiness();
        });
    }
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
