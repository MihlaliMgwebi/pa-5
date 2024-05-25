import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ILecturer } from 'src/interfaces/lecturer.model';

export interface IAPIResponse {
  lecturers: ILecturer[];
}

@Injectable({
  providedIn: 'root',
})
export class LecturerServiceService {
  // create url variable to hold the php_ionic json-data-students.php file
  private _urlLecturers = environment.urlLecturers;
  private _http = inject(HttpClient);
  

  constructor() {}

  // create a method to get the data from the json-data-students.php file
  public getLecturers(): Observable<ILecturer[]> { 
    // return type is Observable<any>
    return this._http.post<IAPIResponse>(this._urlLecturers).pipe(
      map(x => x.lecturers)
    );
  }
}
//Note:  
// Observable is a representation of a stream of data or events that can be observed over time. 
// It is a powerful tool for working with asynchronous data and event-based programming. 
// It can be created from a variety of sources, including HTTP requests, timers, user inputs, and more.