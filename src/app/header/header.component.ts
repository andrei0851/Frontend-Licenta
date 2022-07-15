import { Component, OnInit } from '@angular/core';
import jwtDecode from "jwt-decode";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  token!: string;
  role!: string;

  constructor() {
  }

  getDecodedAccessToken(): any{
    try{
      return jwtDecode(this.token);
    }catch (Error){
      return null;
    }
  }

  logout(): void{
    window.localStorage.removeItem('token');
    window.location.reload();
  }

  ngOnInit(): void {
    this.token = window.localStorage.getItem('token') ?? "";
    const tokenInfo = this.getDecodedAccessToken();
    this.role = tokenInfo?.Role;
  }
}
