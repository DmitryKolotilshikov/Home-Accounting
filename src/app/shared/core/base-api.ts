import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class BaseApi {
    
    private baseUrl = `http://localhost:3000/`;

    constructor(public http: HttpClient) {}

    private getUrl(url: string = ''): string {
            return this.baseUrl + url;
    }

    public get(url: string = ''): Observable<any> {
        return this.http.get(this.getUrl(url));
    }
    
    public post(url: string = '', data: any = {}): Observable<any> {
        return this.http.post(this.getUrl(url), data);
    }
    
    public put(url: string = '', data: any = {}): Observable<any> {
        return this.http.put(this.getUrl(url), data);
    }
}