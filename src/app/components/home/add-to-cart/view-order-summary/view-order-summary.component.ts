import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IOrderSummaryModel } from 'src/app/components/models/productList.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-order-summary',
  templateUrl: './view-order-summary.component.html',
  styleUrls: ['./view-order-summary.component.scss']
})
export class ViewOrderSummaryComponent implements OnInit {
  orderSummaryData: IOrderSummaryModel; // holds the orderSummary Data
  loading: boolean; // spinner variable
  orderLength: number; // holds the length of orderSummary Data
  constructor(private toastr: ToastrService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getOrderSummary();
  }

  // calls to get details of order Summary
  getOrderSummary(): void {
    this.loading = true;
    this.apiService.getOrderSummary().subscribe((res: IOrderSummaryModel) => {
      this.orderLength = res.length;
      this.orderSummaryData = res;
      this.loading = false;
    });
  }

  // calls to clear order Summary
  clearOrderSummary(): void {
    this.loading = true;
    this.apiService.getClearOrderSummary().subscribe(() => {
      this.loading = false;
      this.toastr.info('😊', 'Your Order List has been cleared');
      this.getOrderSummary();
    });
  }
}
