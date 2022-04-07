import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiURL = 'https://jsonplaceholder.typicode.com';

  headers: HttpHeaders | any;
  options: any;
  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({
      Accept: 'text/html',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
      'Content-Type':
        'application/json, text/html,multipart/form-data; boundary=something',
    });
    this.options = { headers: this.headers };
  }

  getAll(): Observable<any> {
    return this.httpClient
      .get(this.apiURL + '/posts/')

      .pipe(catchError(this.errorHandler));
  }

  create(post: any): Observable<any> {
    return this.httpClient
      .post(this.apiURL + '/posts/', JSON.stringify(post), this.headers)

      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<any> {
    return this.httpClient
      .get(this.apiURL + '/posts/' + id)

      .pipe(catchError(this.errorHandler));
  }

  update(id: number, post: any): Observable<any> {
    return this.httpClient
      .put(this.apiURL + '/posts/' + id, JSON.stringify(post), this.headers)

      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient
      .delete(this.apiURL + '/posts/' + id, this.headers)

      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
