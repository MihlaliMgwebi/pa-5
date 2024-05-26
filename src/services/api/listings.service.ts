import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IListing, IListingPostBody, IListingResponseObject } from 'src/interfaces/listing.model';


@Injectable({
  providedIn: 'root'
})
export class ListingsService {
  private _http = inject(HttpClient);
  private _baseUrl = environment.api_url;
  private _listingPostBody: IListingPostBody | undefined;

  constructor() { }

  public getAPIKey(){
    return localStorage.getItem('api_key') ?? '';
  }
  public getListingPostBody() : IListingPostBody {
    return this._listingPostBody ?? {} as IListingPostBody;
  }

  public setAPIKey(apikey: string){
    localStorage.setItem('api_key', apikey);
  }
  public setListingPostBody(body: IListingPostBody){
    this._listingPostBody = body;
  }
  
  public get(): Observable<IListing[]> {
    const _body = this._listingPostBody;

    let body = new HttpParams()
     .set('apikey', this.getAPIKey())
     .set('type', _body?.type ?? 'GetAllListings')
     .set('return', (_body && Array.isArray(_body?.return)) ? _body.return.join(',') : ['id', 'title', 'location', 'price', 'bedrooms', 'bathrooms', 'url', 'parking spaces', 'amenities', 'description', 'type', 'images'].join(','));

    if (_body?.limit) {
      body = body.set('limit', _body.limit.toString());
    }

    if (_body?.order) {
      body = body.set('order', _body.order);
    }

    if (_body?.fuzzy!== undefined) {
      body = body.set('fuzzy', _body.fuzzy.toString());
    }

    if (_body?.search) {
      body = body.set('search', JSON.stringify(_body.search));
    }

    return this._http.post<IListingResponseObject>(this._baseUrl, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).pipe(
      tap(response => console.log(response.data)),
      map(response => response.data)
    );
  }

}
//Note:
// Observable is a representation of a stream of data or events that can be observed over time.
// It is a powerful tool for working with asynchronous data and event-based programming.
// It can be created from a variety of sources, including HTTP requests, timers, user inputs, and more.