import {Component, Input, OnInit} from '@angular/core';
import jwtDecode from "jwt-decode";
import {ListingService} from "../services/listing.service";

@Component({
  selector: 'app-vechile-card',
  templateUrl: './vechile-card.component.html',
  styleUrls: ['./vechile-card.component.scss']
})
export class VechileCardComponent implements OnInit {
  @Input() vehicle:any;
  token!: string;
  userid!: string;
  isFav!: boolean;

  constructor(private listingService: ListingService) { }

  ngOnInit(): void {
    this.token = window.localStorage.getItem('token') ?? "";
    const tokenInfo = this.getDecodedAccessToken();
    this.userid = tokenInfo?.ID;
    if(this.token){
      this.listingService.isFav(this.vehicle.id).subscribe((response: any) => {
        this.isFav = response.fav;
      })
    }

  }

  getDecodedAccessToken(): any{
    try{
      return jwtDecode(this.token);
    }catch (Error){
      return null;
    }
  }


  fav() {
    this.listingService.addFav(this.vehicle.id).subscribe((response:any) =>{
      window.alert(response.status);
      window.location.reload();
    }, (error) => {
      window.alert(error);
    })
  }

  remFav() {
    this.listingService.remFav(this.vehicle.id).subscribe((response:any) =>{
      window.alert(response.status);
      window.location.reload();
    }, (error) => {
      window.alert(error);
    })
  }
}
