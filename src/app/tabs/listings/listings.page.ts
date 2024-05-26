import { Component, inject } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { IListing } from 'src/interfaces/listing.model';
import { ListingsService } from 'src/services/api/listings.service';

@Component({
  selector: 'app-listings',
  templateUrl: 'listings.page.html',
  styleUrls: ['listings.page.scss']
})
export class ListingsPage {
  private _loadingCtrl = inject(LoadingController)
  private _listingsService = inject(ListingsService);
  protected newListings: Observable<IListing[]> | undefined = undefined;

  constructor() {
    this.getListings();
  }
  
  private async getListings(): Promise<void> {
    (await this.showLoading()).onDidDismiss().then(() => {      
      this.newListings = this._listingsService.get()
    });
  }
  
  private async showLoading(){
    const loading = await this._loadingCtrl.create({
      message: 'Dismissing after 3 seconds...',
      duration: 3000,
    });
  
    await loading.present();

    return loading;
  }
  
  protected getListingImage(listOfImages: string){
    console.log(listOfImages.split(',')[0])
    return listOfImages.split(',')[0] 
  }

  public handleRefresh(event: CustomEvent): void {
    this.getListings().then(() => {
      (event.target as HTMLIonRefresherElement).complete();
    });
  }
  
}
