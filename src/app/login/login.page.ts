import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IAPIResponse } from 'src/interfaces/api-response.model';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  private _router = inject(Router);
  private _authService = inject(AuthService);

  constructor() { }

  protected login(form: NgForm){
    const { username, password } = form.value
    
    this._authService.login(username, password).subscribe((res: IAPIResponse)=>{
      if (res.success && res.api_key){
        this._router.navigateByUrl(environment.redirect_url);
        sessionStorage.setItem('apiKey', res.api_key);
      } else {
        console.error(res.message)
      }
    });
  }

  protected logout(){
    sessionStorage.removeItem('apiKey');
    this._router.navigateByUrl('');
  }

  // TODO: Splash page
}
