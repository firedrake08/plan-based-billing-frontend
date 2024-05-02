import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  currentCustomer: any;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.currentCustomer = this.authService.currentCustomer;
  }

}
