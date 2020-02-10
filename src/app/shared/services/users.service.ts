import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({providedIn: 'root'})

export class UsersService {
    
    constructor(private http: HttpClient) {}

    getUserByEmail(email: string): Observable<User> {
        return this.http.get(`http://localhost:3000/users?email=${email}`)
          .pipe(
              map((user: User[]) => user[0] ? user[0] : undefined )
          )
    }

    createNewUser(user: User): Observable<User> {
        return this.http.post<User>(`http://localhost:3000/users`, user)        
    }
}