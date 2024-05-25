import { Component, OnInit, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { IListing, IListingPostBody } from 'src/interfaces/listing.model';
import { ListingsService } from 'src/services/api/listings.service';

@Component({
  selector: 'app-listings',
  templateUrl: 'listings.page.html',
  styleUrls: ['listings.page.scss']
})
export class ListingsPage implements OnInit {
  private _listingPostBody: IListingPostBody | undefined;
  private _listingsService = inject(ListingsService);
  protected newListings: Observable<IListing[]> | undefined;
  // create 2 variables to store results emitted from observable
  // lecturers: any;
  // newLecturers: any;

  // inject student service into the constructor
  constructor() {}

  protected setListingPostBody(){
    // TODO Remove hard coding.
    const apikey = localStorage.getItem('api_key') ?? '';
    const type = 'GetAllListings'

    this._listingPostBody = {
      apikey,
      type,
      return: ['id', 'title', 'location', 'price', 'bedrooms', 'bathrooms', 'url', 'parking spaces', 'amenities', 'description', 'type', 'images'],
    };
  }
  // call the getLecturerData() method when the page loads
  public ngOnInit() {
    this.setListingPostBody();    // TODO Remove hard coding.
    console.log(this._listingPostBody)
    if (this._listingPostBody) 
      this.newListings = this._listingsService.get(this._listingPostBody);
  }
}