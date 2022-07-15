import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class OwnerGuardService implements CanActivate{

  constructor() { }

  token!: string;
  role!: string;

  getDecodedAccessToken(): any{
    try{
      return jwtDecode(this.token);
    }catch (Error){
      return null;
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    this.token = window.localStorage.getItem('token') ?? "";
    const tokenInfo = this.getDecodedAccessToken();
    this.role = tokenInfo?.Role;
    return (this.role == "Owner" || this.role == "Admin") ? true: false;
  }
}
