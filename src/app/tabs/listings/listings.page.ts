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
  private _listingsService = inject(ListingsService);
  private _listingPostBody: IListingPostBody | undefined;
  protected newListings: Observable<IListing[]> | undefined;

  constructor() {}

  public ngOnInit() {
    const type = "GetAllListings";
    const apikey = this._listingsService.getAPIKey();

    this._listingPostBody = {
      apikey,
      type,
      return: '*',
    }

    this._listingsService.setListingPostBody(this._listingPostBody);
    this.newListings = this._listingsService.get();
  }
}