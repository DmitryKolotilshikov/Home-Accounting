import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';

import { BillService } from '../shared/services/bill.services';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';

import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { appEvent } from '../shared/models/event.model';

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events;

  sub1: Subscription

  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventsService: EventsService
    ) { }

  ngOnInit() {
      this.sub1 = combineLatest(
        this.billService.getBill(),
        this.categoriesService.getCategory(),
        this.eventsService.getEvents()
      ).subscribe((data: [Bill, Category[], appEvent])=> {
          this.bill = data[0];
          this.categories = data[1];
          this.events = data[2];
          
          this.isLoaded = true;
      })
  }

  getCategoryCost(category: Category): number {
    const catEvents = this.events.filter((e) => e.category === category.id && e.type === 'outcome');
    return catEvents.reduce((total, e) => {
          total += e.amount;
          return total;
    }, 0)
  }
 
  private getPercent(cat: Category): number {
      const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
      return percent > 100 ? 100 : percent;
  }

  getCatColorClass(cat: Category): string {
       const percent = this.getPercent(cat);
       return percent < 60 ? 'success' : percent >= 95 ? 'danger' : 'warning';
  }

  ngOnDestroy() {
    if(this.sub1) this.sub1.unsubscribe();
  }

}
