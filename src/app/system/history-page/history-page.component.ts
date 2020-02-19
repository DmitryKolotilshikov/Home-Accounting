import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';

import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';

import { Category } from '../shared/models/category.model';
import { appEvent } from '../shared/models/event.model';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  events;

  isLoaded = false;
  chartData = [];
  sub1: Subscription

  isFilterVisible = false;

  constructor(
    private categoriesService: CategoriesService,
    private eventsService: EventsService
    ) { }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.categoriesService.getCategory(),
      this.eventsService.getEvents()
    ).subscribe((data: [Category[], appEvent])=>{
        this.categories = data[0];
        this.events = data[1];

        this.calculateChartData();

        this.isLoaded = true;
    })
  }

  calculateChartData(): void {
      this.chartData = [];

      this.categories.forEach(cat => {
        const dataEvents = this.events.filter( e => e.category === cat.id && e.type === 'outcome');
        this.chartData.push({
          name: cat.name,
          value: dataEvents.reduce((total, event) => {
              total += event.amount
              return total
          },0)
        })
      })
  }

  private toggleFilterVisibility(dir: boolean) {
      this.isFilterVisible = dir;
  }

  openFilter() {
      this.toggleFilterVisibility(true);
  }

    onFilterApply(filterData) {
        console.log('ДАННЫЕ ИЗ МОДАЛЬНОГО ОКНА:', filterData);        
    }

    onFilterCancel() {
      this.toggleFilterVisibility(false);
    }

  ngOnDestroy() {
    if(this.sub1) this.sub1.unsubscribe();
  }

}
