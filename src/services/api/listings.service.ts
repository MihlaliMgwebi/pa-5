import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

import { ToastController } from "@ionic/angular";
import { environment } from 'src/environments/environment';
import { IListing, IListingPostBody, IListingResponseObject } from 'src/interfaces/listing.model';


@Injectable({
  providedIn: 'root'
})
export class ListingsService {
  private _toastController = inject(ToastController);
  private _http = inject(HttpClient);
  private _baseUrl = environment.api_url;
  private _listingPostBody: IListingPostBody | undefined;

  constructor() { }

  private async presentToast(message: string): Promise<void>{
    const toast = await this._toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }

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

    let body = new URLSearchParams();
     body.set('apikey', this.getAPIKey())
     body.set('type', _body?.type ?? 'GetAllListings')
     body.set('return', ((_body?.return && _body.return.length)) ? (JSON.stringify(_body.return)) : (JSON.stringify(['id', 'title', 'location', 'price', 'bedrooms', 'bathrooms', 'url', 'parking_spaces', 'amenities', 'description', 'type', 'images'])));

    if (_body?.limit) {
      body.set('limit', _body.limit.toString());
    }

    if (_body?.order) {
      body.set('order', _body.order);
    }

    if (_body?.fuzzy!== undefined) {
      body.set('fuzzy', _body.fuzzy.toString());
    }

    if (_body?.search) {
      body.set('search', JSON.stringify(_body.search));
    }
    return this._http.post<IListingResponseObject>(this._baseUrl, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).pipe(
      tap((response) => {
        const message = response.status ? 'Latest Data Fetched' : response.message;
        this.presentToast(message);
      }),
      map(response => response.data)
    );
  }

}
//Note:
// Observable is a representation of a stream of data or events that can be observed over time.
// It is a powerful tool for working with asynchronous data and event-based programming.
// It can be created from a variety of sources, including HTTP requests, timers, user inputs, and more.
