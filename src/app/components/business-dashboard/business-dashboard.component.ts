import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-dashboard',
  templateUrl: './business-dashboard.component.html',
  styleUrls: ['./business-dashboard.component.scss']
})
export class BusinessDashboardComponent implements OnInit {
  currentBusiness: any;

  constructor(public authService: AuthService,public router: Router,) { }

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


  logout() {
    let logoutConfirm = window.confirm("Are you sure you want to logout?");
    if(logoutConfirm){
      this.authService.currentBusiness = null;
    window.localStorage.clear();
    this.router.navigate(['']);
    }
  }

}
