import { Component, OnInit } from '@angular/core';
import {ListingService} from "../services/listing.service";
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-listings',
  templateUrl: './my-listings.component.html',
  styleUrls: ['./my-listings.component.scss']
})
export class MyListingsComponent implements OnInit {

  vehicles!: any[];
  selected = '1';
  id!: number;
  public payPalConfig?: IPayPalConfig;

  constructor(private listingService: ListingService,
              private router: Router) { }

  ngOnInit(): void {
    this.getMyListings();
    this.initConfig();
  }

  private getMyListings() {
    this.listingService.getMyListings().subscribe((response: any) => {
      this.vehicles = response.array;
    });

  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: this.selected!,
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: this.selected!
                }
              }
            },
            items: [
              {
                name: 'Promote vehicle for ' + this.selected + ' days',
                quantity: '1',
                unit_amount: {
                  currency_code: 'EUR',
                  value: this.selected!,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        actions.order.get().then((details : any) => {
        });
      },
      onClientAuthorization: (data) => {
        this.listingService.promote(this.id,this.selected).subscribe((response: any) => {
          window.alert(response.status);
        })
      },
      onCancel: (data, actions) => {
        window.alert("Purchase canceled.")
      },
      onError: err => {
        window.alert("Purchase error.")
      },
      onClick: (data, actions) => {
      },
    };
  }

  changeSelection() {
    this.initConfig();
  }

  changeID(id: number) {
    this.id = id;
  }

  edit(car: any) {
    this.router.navigateByUrl('/edit',{state: car});
  }

  delete(id: number) {
    if(window.confirm("Do you really want to delete this listing?")){
      this.listingService.delete(id).subscribe((response: any) =>{
        window.alert(response.status);
        window.location.reload();
      })
    }
  }
}
