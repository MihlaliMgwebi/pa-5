// import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { RouterLink } from '@angular/router';
// import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: 'logout.page.html',
  styleUrls: [],//styleUrls: ['logout.page.scss']
  // TODO
  // standalone: true,
  // imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class LogoutPage implements OnInit {
  private _router = inject(Router);
  
  constructor() {}


  protected logout(){
    localStorage.removeItem('apiKey');
    this._router.navigateByUrl('');
  }

  public ngOnInit(): void {
    this.logout();
  }

}
