import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BusinessService } from 'src/app/services/business.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  currentBusiness: any;
  addServiceForm: FormGroup;
  updateServiceForm:FormGroup;
  serviceToBeUpdated:any = null;
  modalRef?: BsModalRef;
  loading:boolean = false;
  constructor(public authService: AuthService,public fb: FormBuilder,public bizService: BusinessService,private modalService: BsModalService) {
    this.addServiceForm = this.fb.group({
      services: this.fb.array([])
    });

    this.updateServiceForm = this.fb.group({
      title: ['',Validators.required],
      price: ['',Validators.required],
    });
  }

  ngOnInit(): void {
    this.currentBusiness = this.authService.currentBusiness;
  }

  get services() {
    return this.addServiceForm.get('services') as FormArray;
  }

  addService() {
    let service = this.fb.group({
      title: ['',Validators.required],
      price: ['',Validators.required],
    });
    this.services.push(service);
  }

  removeService(ind:number){
    this.services.removeAt(ind);
  }

  saveServices() {
    this.loading = true;
    this.bizService
      .updateServices(this.currentBusiness._id, this.addServiceForm.value)
      .subscribe((res) => {
        alert(`Services updated for ${this.currentBusiness.businessName}`);
        this.addServiceForm.reset();
        this.services.clear();
        this.getUpdatedBusiness();
      });
  }

  openUpdateServiceModal(template: TemplateRef<any>,serviceObj:any) {
    this.modalRef = this.modalService.show(template);
    this.serviceToBeUpdated = serviceObj;
    this.updateServiceForm.get('title')?.setValue(serviceObj.title);
    this.updateServiceForm.get('price')?.setValue(serviceObj.price);
  }

  updateService(){
    this.loading = true;
    this.bizService.updateServiceByTitle(this.currentBusiness._id,this.serviceToBeUpdated.title,this.updateServiceForm.value).subscribe((res)=>{
      this.closeUpdateServiceModal();
      this.getUpdatedBusiness();
    })
  }

  closeUpdateServiceModal(){
    this.modalRef?.hide();
    this.updateServiceForm.reset();
    this.serviceToBeUpdated = null;
  }

  deleteService(title: any) {
    let delConfirm = window.confirm(
      'Are you sure you want to delete this service?'
    );
    if (delConfirm) {
      this.loading = true;
      this.bizService
        .deleteServiceByTitle(this.currentBusiness._id, title)
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
