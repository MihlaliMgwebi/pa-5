import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAPIResponse } from 'src/interfaces/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _http = inject(HttpClient);
  private _baseUrl = environment.login;

  constructor() { }

  public login(username: string, password: string): Observable<IAPIResponse> {
    const body = new HttpParams()
    .set('username', username)
    .set('password', password);

 
    return this._http.post<IAPIResponse>(this._baseUrl, body.toString(), {
      // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain a clue as to what went wrong.
          console.error(`Backend returned code ${error.status}, body was:`, error.error);
      
          // Extract the error message from the response body
          const errorMessage = error.error.error;
          return throwError(()=> { errorMessage });
        }
      
        // Return an empty observable to avoid breaking the chain
        return throwError(()=> 'An unknown error occurred');
      })
    );
  }
}