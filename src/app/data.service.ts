import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiURL = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.apiURL).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError(() => 'Something went wrong; please try again later.');
  }
}
