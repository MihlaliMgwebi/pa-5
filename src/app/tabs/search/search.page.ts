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
  private _router = inject(Router);
  protected searchForm: FormGroup;

  constructor() {
    this.searchForm = this._formBuilder.group({
      type: new FormControl('GetAllListings'),
      limit: new FormControl(10),
      sort: new FormControl('id'),
      order: new FormControl('asc'),
      fuzzy: new FormControl(false),
      search: this._formBuilder.group({
        id: new FormControl(0),
        title: new FormControl(''),
        location: new FormControl(''),
        price_min: new FormControl(0),
        price_max: new FormControl(Infinity),
        bedrooms: new FormControl(0),
        bathrooms: new FormControl(0),
        parking_spaces: new FormControl(0),
        amenities: new FormControl(''),
        type: new FormControl('sale'),
      }),
      return: new FormControl([]),
    });
  }

  protected getFields(): string[] {
    return ['id', 'title', 'location', 'price', 'bedrooms', 'bathrooms', 'url', 'parking_spaces', 'amenities', 'description', 'type', 'images']
  }

  protected onSubmit(): void {
    const body = this.searchForm.value as IListingPostBody;
    this._listingsService.setListingPostBody(body);
    this._listingsService.get().subscribe((data)=> (data) ? this._router.navigateByUrl(environment.redirect_url): '');
  }

  protected readonly Object = Object;
}
