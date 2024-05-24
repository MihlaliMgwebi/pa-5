import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

// TODO: Bug - Navigates to login but does not render form
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
    canActivate(): boolean {
      const apiKey = localStorage.getItem('apiKey');
      return !!apiKey; //true if it exists
  }
}
export const canActivateTabs: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
) => {
  return inject(AuthGuardService).canActivate();
};