import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService } from '../shared/services/bill.services';
import { combineLatest, Subscription } from 'rxjs';
import { Bill } from '../shared/models/bill.model';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  sub1: Subscription
  sub2: Subscription

  currency: any;
  bill: Bill;
  isLoaded = false;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((data: [Bill, any]) => {
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;
    })
  }

  onRefresh() {
    this.isLoaded = false;
    this.sub2 = this.billService.getCurrency()
    .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
    })
  }

  ngOnDestroy() {
    if(this.sub1) {
      this.sub1.unsubscribe()
    }
    if(this.sub2) {
      this.sub2.unsubscribe()
    }
  }
}
