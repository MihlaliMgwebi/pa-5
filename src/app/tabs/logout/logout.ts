import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: 'logout.page.html',
  styleUrls: []
})
export class LogoutPage implements OnInit {
  private _router = inject(Router);
  
  constructor() {}

  protected logout(){
    localStorage.removeItem('api_key');
    this._router.navigateByUrl('');
  }

  public ngOnInit(): void {
    this.logout();
  }
}
