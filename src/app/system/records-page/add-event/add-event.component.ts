import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Category } from '../../shared/models/category.model';
import { appEvent } from '../../shared/models/event.model';
import { EventsService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.services';
import { Bill } from '../../shared/models/bill.model';
import { Message } from 'src/app/shared/models/message.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  @Input() categories: Category[] = [];

  message: Message;
  sub1: Subscription;
  sub2: Subscription;

  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ]

  constructor(
    private eventsService: EventsService,
    private billService: BillService
    ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  showMessage(text: string) {
      this.message.text = text;
      setTimeout(()=>this.message.text='', 5000)
  }

  onSubmit(form: NgForm) {
    
    let { type, amount, category, description } = form.value;
    if(amount < 0) amount *=-1

    const event = new appEvent(type, amount, +category, 
      moment().format('DD.MM.YYYY HH:mm:ss'), description);  
      
     this.sub1 = this.billService.getBill()
       .subscribe((bill: Bill)=> {
         let value = 0;
        if(type === 'outcome') {
          if( amount > bill.value) {
            this.showMessage(`На счету недостаточно средств. Вам не хватает ${amount - bill.value} ${bill.currency}`);
            return
          } else {
              value = bill.value - amount;
          }
         } else {
            value = bill.value + amount;
         }

         this.sub2 = this.billService.updateBill({value, currency: bill.currency})
         .pipe(
           mergeMap(()=> this.eventsService.addEvent(event))
         )
         .subscribe(()=>{
           form.setValue({
               type: 'outcome',
               amount: 0, 
               category,
               description: ''            
           })
         });
       })
  }   

  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
    if (this.sub2) this.sub2.unsubscribe();
  }

}
