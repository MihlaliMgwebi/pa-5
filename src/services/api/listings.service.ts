import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IListing, IListingPostBody, IListingResponseObject } from 'src/interfaces/listing.model';


@Injectable({
  providedIn: 'root'
})
export class ListingsService {
  // Inject HttpClient into the constructor
  private _http = inject(HttpClient);
  // create url variable to hold the php_ionic json-data-students.php file
  private _baseUrl = environment.api_url;

  constructor() { }

  // create a method to get the data from the json-data-students.php file
  public get(_body: IListingPostBody): Observable<IListing[]> { 
    const body = new HttpParams()
    .set('apikey', _body.apikey)
    .set('type', _body.type)
    .set('return', Array.isArray(_body.return)? _body.return.join(',') : _body.return);


    return this._http.post<IListingResponseObject>(this._baseUrl, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).pipe(
      map(response => response.data)
    );
  }

}
//Note:  
// Observable is a representation of a stream of data or events that can be observed over time. 
// It is a powerful tool for working with asynchronous data and event-based programming. 
// It can be created from a variety of sources, including HTTP requests, timers, user inputs, and more.


// import { IAPIResponse } from './api-response.interface';

// interface IListingRequest extends IAPIResponse {
//     limit?: number;
//     apikey: string;
//     type: string;
//     sort?: string;
//     order?: 'ASC' | 'DESC';
//     fuzzy?: boolean;
//     search?: {
//         [key: string]: any;
//     };
//     return: string | string[];
// }

// // Example usage
// const listingRequest: IListingRequest = {
//     success: 1,
//     apikey: 'your_api_key',
//     type: 'GetAllListings',
//     return: ['id', 'title', 'location', 'price', 'bedrooms', 'bathrooms', 'url', 'parking spaces', 'amenities', 'description', 'type', 'images'],
// };

// // You can also add optional properties
// listingRequest.limit = 10;
// listingRequest.sort = 'price';
// listingRequest.order = 'DESC';
// listingRequest.fuzzy = false;
// listingRequest.search = {
//     location: 'Sydney',
//     price_min: 200,
//     price_max: 500,
//     bedrooms: 3,
//     bathrooms: 2,
// };

// // Now you can send the `listingRequest` object as a POST request to the API