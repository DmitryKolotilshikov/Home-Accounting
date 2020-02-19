import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { CategoriesService } from '../../shared/services/categories.service';
import { EventsService } from '../../shared/services/events.service';
import { appEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: appEvent;
  category: Category[];

  isLoaded = false;
  sub1: Subscription;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private eventsService: EventsService
    ) { }

  ngOnInit() {
   this.sub1 = this.route.params
    .pipe(
      mergeMap((params: Params) => {
        return this.eventsService.getEventsById(params['id'])
      })
    ).pipe(
      mergeMap((event: appEvent) => {
        this.event = event;
        return this.categoriesService.getCategoryById(event.category);
      })
    )
    .subscribe((category: Category[]) => {
      this.category = category;
      
      this.isLoaded = true;
    })
  }

  getEventClass(e: any) {    
    return {
      'card': true,
      'card-success': e.type === 'income',
      'card-danger': e.type === 'outcome'
    }
  }

  ngOnDestroy() {
    if(this.sub1) this.sub1.unsubscribe();
  }

}
