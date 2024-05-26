import { Component, OnInit, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { IListing } from 'src/interfaces/listing.model';
import { ListingsService } from 'src/services/api/listings.service';

@Component({
  selector: 'app-listings',
  templateUrl: 'listings.page.html',
  styleUrls: ['listings.page.scss']
})
export class ListingsPage implements OnInit {
  private _listingsService = inject(ListingsService);
  protected newListings: Observable<IListing[]> | undefined;

  constructor() {}

  public ngOnInit() {
    this.newListings = this._listingsService.get();
  }
// {
  // constructor(private loadingCtrl: LoadingController) {}
  //
  // async showLoading() {
  //   const loading = await this.loadingCtrl.create({
  //     message: 'Dismissing after 3 seconds...',
  //     duration: 3000,
  //   });
  //
  //   loading.present();
  // }
}
