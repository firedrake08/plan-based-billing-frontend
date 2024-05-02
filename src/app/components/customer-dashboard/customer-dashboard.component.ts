import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit {
  currentCustomer: any;
  constructor(public authService: AuthService,public router: Router,) { }

  ngOnInit(): void {
    if (this.authService.currentCustomer) {
      this.currentCustomer = this.authService.currentCustomer;
    } else {
      this.authService.currentCustomer = JSON.parse(
        window.localStorage.getItem('currentCustomer') as string
      );
      this.currentCustomer = this.authService.currentCustomer;
    }
  }

  logout() {
    let logoutConfirm = window.confirm("Are you sure you want to logout?");
    if(logoutConfirm){
      this.authService.currentBusiness = null;
    window.localStorage.clear();
    this.router.navigate(['']);
    }
  }

}
