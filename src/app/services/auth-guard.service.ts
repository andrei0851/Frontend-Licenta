import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  constructor() {}

  getAuthToken():string {
    return localStorage.getItem('token')!;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = window.localStorage.getItem('token');
    return token ? true : false;
  }
}
