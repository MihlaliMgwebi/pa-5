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

  public login(name: string, password: string): Observable<IAPIResponse> {
    const body = new HttpParams()
    .set('name', name)
    .set('password', password);

    return this._http.post<IAPIResponse>(this._baseUrl, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          console.error(`Backend returned code ${error.status}, body was:`, error.error);
      
          const errorMessage = error.error.error;
          return throwError(()=> { errorMessage });
        }

        return throwError(()=> 'An unknown error occurred');
      })
    );
  }
}