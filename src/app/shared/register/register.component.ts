import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  businessForm:FormGroup;

  constructor(public fb:FormBuilder,public authService:AuthService,public router:Router) {
    this.businessForm = this.fb.group({
      businessName:[''],
      primaryMobile:[''],
      email:[''],
      password:['']
    })
   }

  ngOnInit(): void {
  }

  registerBusiness(){
    this.authService.registerBusiness(this.businessForm.value).subscribe((res)=>{
      alert(`${res} added successfully`);
      this.router.navigate(['/login'])
    })
  }



}
