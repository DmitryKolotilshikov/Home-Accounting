import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  @Output() onCategoryAdd = new EventEmitter<Category>();

  constructor(private categoryService: CategoriesService) { }

  onSubmit(form: NgForm) {
      let { name, capacity } = form.value;
      if(capacity < 0) {
        capacity *= -1;
      } 
      const category = new Category(name, capacity);

      this.categoryService.addCategory(category)
      .subscribe((category: Category) => {
        form.reset();
        form.form.patchValue({capacity: 1})
        this.onCategoryAdd.emit(category)   
      })
  }

}
