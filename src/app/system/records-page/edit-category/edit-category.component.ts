import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';
import { Message } from 'src/app/shared/models/message.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();

  sub1: Subscription

  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.onCategoryChange();
    this.message = new Message('success', '');
  }

  onCategoryChange() {
    this.currentCategory = this.categories.find(c => c.id === +this.currentCategoryId);
  }

  onSubmit(form: NgForm){
      let {name, capacity} = form.value;
      if(capacity < 0 ) capacity *=-1;

      const category = new Category(name, capacity, +this.currentCategoryId);

      this.sub1 = this.categoriesService.updateCategory(category)
      .subscribe((category: Category)=>{
        this.onCategoryEdit.emit(category);  
        this.message.text = 'Категория успешно отредактирована!';
        setTimeout(()=> this.message.text ='', 5000);  
      })
  }

  ngOnDestroy(){
    if (this.sub1) this.sub1.unsubscribe();
  }
}
