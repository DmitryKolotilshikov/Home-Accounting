import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseApi } from 'src/app/shared/core/base-api';
import { Category } from '../models/category.model';

@Injectable()

export class CategoriesService extends BaseApi{
    constructor(public http: HttpClient){
        super(http)
    }

    addCategory(category: Category): Observable<Category> {
        return this.post('categories', category)
    }
}