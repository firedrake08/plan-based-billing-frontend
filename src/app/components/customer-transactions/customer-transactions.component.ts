import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-customer-transactions',
  templateUrl: './customer-transactions.component.html',
  styleUrls: ['./customer-transactions.component.scss']
})
export class CustomerTransactionsComponent implements OnInit {
  currentCustomer: any;
  allTransactions:any = [];
  filteredTransactions:any = [];
  loading:boolean = false;
  constructor(public authService: AuthService,public custService:CustomerService) { }

  ngOnInit(): void {
    this.currentCustomer = this.authService.currentCustomer;
    this.getAllTransactions();
  }

  getAllTransactions(){
    this.loading = true;
    this.custService.fetchCustomerTransactions(this.currentCustomer.mobile).subscribe((res)=>{
      this.loading = false;
      this.filteredTransactions = this.allTransactions = res;
    })
  }

  handleDateChange(dateRange: any) {
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

  downloadSheet(bill:any) {
    bill.date = new Date(bill.date)
    bill.availedServices = bill.availedServices.join(",");
    const worksheet = XLSX.utils.json_to_sheet([bill]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, 'invoice.xlsx', { bookType: 'xlsx', type: 'array' });
  }

}
