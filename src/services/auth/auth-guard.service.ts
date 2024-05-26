import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
    canActivate(): boolean {
      const apiKey = localStorage.getItem('api_key');
      return !!apiKey;
  }
}
export const canActivateTabs: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
) => {
  return inject(AuthGuardService).canActivate();
};