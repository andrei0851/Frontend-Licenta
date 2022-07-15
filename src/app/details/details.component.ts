import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ListingService} from "../services/listing.service";
import {AccountService} from "../services/account.service";
import {CompanyService} from "../services/company.service";
import jwtDecode from "jwt-decode";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  id: number;
  vehicle?: any;
  images!: any[];
  user?: any;
  userPic?: any;
  branch?: any;
  company?: any;
  token!: any;
  userID!: any;

  constructor(private activatedRoute: ActivatedRoute, private listingService: ListingService,
              private accountService: AccountService, private companyService: CompanyService,
              private router: Router) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.token = window.localStorage.getItem('token') ?? "";
  }

  ngOnInit(): void {
    this.listingService.getListing(this.id).subscribe((response:any) => {
      this.vehicle = response;
      this.accountService.getUser(this.vehicle.userID).subscribe((response: any) => {
        this.user = response.user;
        if(this.user.companyID != null){
          this.companyService.getCompany(this.user.companyID).subscribe((response:any) =>{
            this.company = response;
          })
        }
        if(this.user.branchID != null){
          this.companyService.getBranch(this.user.branchID).subscribe((response:any) =>{
            this.branch = response.branch;
            this.company = response.company[0];
          })
        }
      })
      this.accountService.getProfilePictureUser(this.vehicle.userID).subscribe((response: any) => {
        this.userPic = response.imgLink;
      })
    });
    this.listingService.getListingPhotos(this.id).subscribe((response: any) => {
      this.images = response.array;
      this.images.sort((a,b) => a.order < b.order ? -1 :1);
    })
    this.token = window.localStorage.getItem('token') ?? "";
    const tokenInfo = this.getDecodedAccessToken();
    this.userID = tokenInfo?.ID;
  }


  getDecodedAccessToken(): any{
    try{
      return jwtDecode(this.token);
    }catch (Error){
      return null;
    }
  }

  buy() {
    this.listingService.isAvailable(this.vehicle.id).subscribe((response:any) => {
      if(response.active == true) {
        this.router.navigate(['/buy/' + this.vehicle.id])
      }
      else{
        window.alert("This vehicle is not available anymore.");
      }
    })

  }
}
