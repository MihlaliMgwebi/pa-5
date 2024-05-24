import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LecturerServiceService {
  // create url variable to hold the php_ionic json-data-students.php file
  urlLecturers = environment.urlLecturers;

  // Inject HttpClient into the constructor
  constructor(private http: HttpClient) {}

  // create a method to get the data from the json-data-students.php file
  getLecturers(): Observable<any> { 
    // return type is Observable<any>
    return this.http.get(this.urlLecturers);
  }
}
//Note:  
// Observable is a representation of a stream of data or events that can be observed over time. 
// It is a powerful tool for working with asynchronous data and event-based programming. 
// It can be created from a variety of sources, including HTTP requests, timers, user inputs, and more.