import { Component, OnInit } from '@angular/core';
import {ListingService} from "../services/listing.service";
import {ActivatedRoute} from "@angular/router";
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  car!: any;
  id!: number;
  public payPalConfig?: IPayPalConfig;

  constructor(private listingSerivice: ListingService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.listingSerivice.getListing(this.id).subscribe((response:any) =>
    {
      this.car = response;
    });
    this.initConfig();
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
              value: this.car.price,
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: this.car.price
                }
              }
            },
            items: [
              {
                name: this.car.manufactureYear + ' ' + this.car.make + ' ' + this.car.model,
                quantity: '1',
                unit_amount: {
                  currency_code: 'EUR',
                  value: this.car.price,
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
        this.listingSerivice.buyVehicle(this.id,data.id).subscribe((response: any) => {
        })
        window.location.href="/";
        window.alert("Purchase successful");
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
}
