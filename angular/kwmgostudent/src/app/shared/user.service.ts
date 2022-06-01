import { Injectable } from '@angular/core';
import { User } from "./user";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User | undefined;
  private api = 'http://kwmgostudent.s1910456007.student.kwmhgb.at/api';
  constructor(private http: HttpClient) { }
  //Error Handler
  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
  getSingleUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.api}/user/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }
}
