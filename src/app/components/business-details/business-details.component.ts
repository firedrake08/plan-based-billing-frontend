import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.scss']
})
export class BusinessDetailsComponent implements OnInit {
  currentBusiness: any;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.currentBusiness = this.authService.currentBusiness;
  }

}
