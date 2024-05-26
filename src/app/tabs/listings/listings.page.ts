import { Component, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { IListing } from 'src/interfaces/listing.model';
import { ListingsService } from 'src/services/api/listings.service';

@Component({
  selector: 'app-listings',
  templateUrl: 'listings.page.html',
  styleUrls: ['listings.page.scss']
})
export class ListingsPage {
  private _listingsService = inject(ListingsService);
  protected newListings: Observable<IListing[]> | undefined;

  constructor() {
    this.newListings = this._listingsService.get()

  }

  public handleRefresh(event: CustomEvent): void {
    setTimeout(() => {
      // Any calls to load data go here
      this.newListings = this._listingsService.get();
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }
}
