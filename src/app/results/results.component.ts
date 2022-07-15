import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ListingService} from "../services/listing.service";

export class searchData{
  makeID!: string;
  modelID!: number;
  priceMin!: number;
  priceMax!: number;
  kmMin!: number;
  kmMax!: number;
  manufactureYearMin!: number;
  manufactureYearMax!: number;
  condition!: string;
  vehicleType!: number;
  fuel!: number;
  color!: number;
  countryID!: number;


  constructor(
    makeID: string,
    modelID: number,
    priceMin: number,
    priceMax: number,
    kmMin: number,
    kmMax: number,
    manufactureYearMin: number,
    manufactureYearMax: number,
    condition: string,
    vehicleType: number,
    fuel: number,
    color: number,
    countryID: number) {
    this.makeID=makeID;
    this.modelID = modelID;
    this.priceMin = priceMin;
    this.priceMax = priceMax;
    this.kmMin = kmMin;
    this.kmMax = kmMax;
    this.manufactureYearMin = manufactureYearMin;
    this.manufactureYearMax = manufactureYearMax;
    this.condition = condition;
    this.vehicleType = vehicleType;
    this.fuel = fuel;
    this.color = color;
    this.countryID = countryID;
  }
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  vehicles?: any;
  makeID!: string;
  modelID!: number;
  priceMin!: number;
  priceMax!: number;
  kmMin!: number;
  kmMax!: number;
  manufactureYearMin!: number;
  manufactureYearMax!: number;
  condition!: string;
  vehicleType!: number;
  fuel!: number;
  color!: number;
  countryID!: number;
  hasResults = true;


  constructor(private route: ActivatedRoute, private listingService: ListingService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.makeID = params['make'];
      this.modelID = params['model'];
      this.priceMin = params['priceMin'];
      this.priceMax = params['priceMax'];
      this.kmMin = params['kmMin'];
      this.kmMax = params['kmMax'];
      this.manufactureYearMin = params['manufactureYearMin'];
      this.manufactureYearMax = params['manufactureYearMax'];
      this.condition = params['condition'];
      this.vehicleType = params['vehicleType'];
      this.fuel = params['fuel'];
      this.color = params['color'];
      this.countryID = params['countryID'];
    });

    const search = new searchData(this.makeID,this.modelID,this.priceMin,this.priceMax
    ,this.kmMin,this.kmMax,this.manufactureYearMin,this.manufactureYearMax,this.condition,
      this.vehicleType,this.fuel,this.color,this.countryID);
    this.listingService.search(search).subscribe((response:any) => {
      this.vehicles = response.array;
      if(this.vehicles.length == 0) this.hasResults = false;
    })
  }

}
