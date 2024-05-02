import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BusinessService } from 'src/app/services/business.service';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  currentBusiness: any;
  filteredTransactions: any = [];
  allTransactions:any = [];
  constructor(public authService: AuthService,public bizService: BusinessService,) { }

  ngOnInit(): void {
    this.currentBusiness = this.authService.currentBusiness;
    this.filteredTransactions = this.allTransactions =  this.currentBusiness.transactions;
  }

  handleDateChange(dateRange: any) {
    console.log(dateRange[0]);
    console.log(typeof dateRange[0]);
    this.filteredTransactions = this.currentBusiness.transactions.filter(
      (transaction: any) => {
        return (
          transaction.date >= dateRange[0].getTime() &&
          transaction.date <= dateRange[1].getTime()
        );
      }
    );
  }

}
