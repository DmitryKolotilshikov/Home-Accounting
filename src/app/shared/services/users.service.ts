import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { BaseApi } from '../core/base-api';

@Injectable({providedIn: 'root'})

export class UsersService extends BaseApi{
    
    constructor(public http: HttpClient) {
        super(http)
    }

    getUserByEmail(email: string): Observable<User> {
        return this.get(`users?email=${email}`)
        .pipe(
            map((user: User[]) => user[0] ? user[0] : undefined )
        )
    }

    createNewUser(user: User): Observable<User> {
        return this.post('users', user)
    }
}