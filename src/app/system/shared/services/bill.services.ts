import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';
import { BaseApi } from 'src/app/shared/core/base-api';

@Injectable()

export class BillService extends BaseApi {
    
    constructor(public http: HttpClient) {
        super(http)
    }

    // getBill(): Observable<Bill> {
    //     return this.http.get<Bill>('http://localhost:3000/bill')
    // }

    getBill(): Observable<Bill> {
        return this.get('bill')
    }

    getCurrency(): Observable<any> {
        return this.http.get(`http://data.fixer.io/api/latest?access_key=3d3a527a0f63cf72bf808e296a0c4410&symbols=USD,BYN&format=1`)
    }

    updateBill(bill: Bill): Observable<Bill> {
        return this.put('bill', bill);
    }
}