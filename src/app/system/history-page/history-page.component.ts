import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import * as moment from 'moment';

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
  filteredEvents;

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

        if(this.filteredEvents === undefined) this.setOriginalEvents();
        
        this.calculateChartData();

        this.isLoaded = true;
    })
    
  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }

  calculateChartData(): void {
      this.chartData = [];

      this.categories.forEach(cat => {
        const dataEvents = this.filteredEvents.filter( e => e.category === cat.id && e.type === 'outcome');
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
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
       
    let startPeriod = moment().startOf(filterData.period).startOf('d');
    let endPeriod = moment().endOf(filterData.period).endOf('d');
    
    if(filterData.period == 2019) {
      startPeriod = moment().set( {'year': 2019, 'month': 0, 'date': 1, 'hour': 0, 'minute': 0} );
      endPeriod = moment().set( {'year': 2019, 'month': 11, 'date': 31, 'hour': 23, 'minute': 59} );
    }  

    this.filteredEvents = this.filteredEvents
      .filter((e) => filterData.types.indexOf(e.type) !== -1)
      .filter((e) => filterData.categories.indexOf(e.category.toString()) !== -1)
      .filter((e) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod)
      })
      
      this.calculateChartData();     
  }

    onFilterCancel() {
      if(this.isFilterVisible === true) {
        this.toggleFilterVisibility(false);
        this.setOriginalEvents();
        this.calculateChartData();
      }
    }

  ngOnDestroy() {
    if(this.sub1) this.sub1.unsubscribe();
  }

}
