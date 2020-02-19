import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApi } from 'src/app/shared/core/base-api';
import { Observable } from 'rxjs';
import { appEvent } from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi{

    constructor(public http: HttpClient) {
        super(http)
    }

    addEvent(event: appEvent): Observable<appEvent> {
            return this.post('events', event)
    }

    getEvents(): Observable<appEvent> {
        return this.get('events')
    }

    getEventsById(id: string): Observable<appEvent> {
        return this.get(`events/${id}`)
    }
}