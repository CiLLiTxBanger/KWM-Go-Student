import { Injectable } from '@angular/core';
import {Offer, User, Timeslot, Usercomment} from "./offer";
import {HttpClient} from "@angular/common/http";
import {Observable,throwError } from "rxjs";
import {catchError, retry} from 'rxjs/operators';

@Injectable()
export class KwmGoStudentService {
  private api = 'http://kwmgostudent.s1910456007.student.kwmhgb.at/api';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Offer>> {
    return this.http.get<Array<Offer>>(`${this.api}/offers`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingle(id: string): Observable<Offer> {
    return this.http.get<Offer>(`${this.api}/offers/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  create(offer: Offer): Observable<any> {
    return this.http.post(`${this.api}/offers`, offer)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  createUsercomment(usercomment: Usercomment): Observable<any> {
    return this.http.post(`${this.api}/usercomment`, usercomment)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  update(offer: Offer): Observable<any> {
    return this.http.put(`${this.api}/offers/${offer.id}`, offer)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.api}/offers/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  removeTimeslot(id: number): Observable<any> {
    return this.http.delete(`${this.api}/timeslot/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
