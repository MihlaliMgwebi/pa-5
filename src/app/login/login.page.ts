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
    const { name, password } = form.value
    
    this._authService.login(name, password).subscribe((res: IAPIResponse)=>{
      if (res.success && res.api_key){
        localStorage.setItem('api_key', res.api_key);
        this._router.navigateByUrl(environment.redirect_url);
      } else {
        console.error(res.message)
      }
    });
  }
  // TODO: Splash page
}
