import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IListingPostBody } from 'src/interfaces/listing.model';
import { ListingsService } from 'src/services/api/listings.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage {
  private _listingsService = inject(ListingsService);
  private _formBuilder = inject(FormBuilder);
  protected searchForm: FormGroup;
  private _router = inject(Router);
  
  constructor() {
    this.searchForm = this._formBuilder.group({
      type: new FormControl('GetAllListings'),
      limit: new FormControl(10),
      sort: new FormControl('id'),
      order: new FormControl('asc'),
      fuzzy: new FormControl(false),
      search: this._formBuilder.group({
        type: new FormControl('sale'),
        location: new FormControl(''),
      }),
      return: new FormControl(['*']),
    });
  }


  protected onSubmit(): void {
    const apikey = this._listingsService.getAPIKey();
    const body = {apikey, ...this.searchForm.value} as IListingPostBody;
    this._listingsService.setListingPostBody(body);
    this._listingsService.get().subscribe(() => this._router.navigateByUrl(environment.redirect_url));
  }

}
