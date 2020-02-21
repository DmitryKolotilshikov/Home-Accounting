import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit{

  @Input() categories: Category[] = [];
  @Input() events = [];

  searchValue = '';
  searchPlaceholder = 'Сумма';
  searchField = 'amount';
  namesMaps = {
    amount: 'Сумма',
    date: 'Дата',
    category: 'Категория',
    type: 'Тип'
  };
  
  constructor() { }

  ngOnInit() {    
    this.events.forEach(e=>{
      e.catName = this.categories.find(c => c.id === e.category).name
    })
  }

  getEventClass(e: any) {
    return {
      'label': true,
      'label-success': e.type === 'income',
      'label-danger': e.type === 'outcome'
    }
  }
  
  changeCriteria(field: string): void { 
    this.searchPlaceholder = this.namesMaps[field];
    this.searchField = field;
  }

}
