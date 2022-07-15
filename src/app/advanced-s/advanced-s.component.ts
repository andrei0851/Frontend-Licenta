import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {ListingService} from "../services/listing.service";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

export class searchData{
  makeID!: number;
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
    makeID: number,
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
  selector: 'app-advanced-s',
  templateUrl: './advanced-s.component.html',
  styleUrls: ['./advanced-s.component.scss']
})
export class AdvancedSComponent implements OnInit {

  searchform!: FormGroup;
  make = new FormControl();
  selectedmake!: number;
  model = new FormControl();
  selectedmodel!: number;
  color = new FormControl();
  selectedcolor!: number;
  fuel = new FormControl();
  selectedfuel! : number;
  country = new FormControl();
  selectedcountry!: number;
  type = new FormControl();
  selectedtype!: number;
  condition!: string;
  typeList!: any[];
  countryList!: any[];
  makeList!: any[];
  modelList!: any[];
  colorsList!: any[];
  fuelTypesList!: any[];
  filteredMakeList!: Observable<any[]>;
  filteredModelList!: Observable<any[]>;
  filteredColorsList!: Observable<any[]>;
  filteredFuelList!: Observable<any[]>;
  filteredCountryList!: Observable<any[]>;
  filteredTypeList!: Observable<any[]>;
  total?: number;

  constructor(
    private fb: FormBuilder,
    private listingService: ListingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.model.disable();
    this.getColors();
    this.getMakes();
    this.getTotal();
    this.getFuel();
    this.getTypes();
    this.getCountries();
    this.filteredMakeList = this.make.valueChanges.pipe(
      startWith(''),
      map(make => this.filterMake(make)),
    );
  }

  createForm():void{
    this.searchform = this.fb.group({
      make:[null],
      model:[null],
      priceMin:[null],
      priceMax:[null],
      kmMin:[null],
      kmMax:[null],
      yearMax: [null],
      yearMin:[null],
      condition: [null],
      vehicleType: [null],
      fuel: [null],
      color: [null],
      country: [null]
    })
  }

  getTotal(){
    this.listingService.getTotal().subscribe((response: any) => {
      if(response == null){
        this.total = 0;
      }
      else{
        this.total = response;
      }
    })
  }

  getMakes() {
    this.listingService.getMakes().subscribe((response: any) => {
      this.makeList = response.array;
      this.make.setValue('');
    });
  }

  getColors(){
    this.listingService.getColors().subscribe((response: any) =>{
      this.colorsList = response.array;
      this.color.setValue('');
      this.subscribeColorChanges();
    })
  }

  subscribeColorChanges() {
    this.filteredColorsList = this.color.valueChanges.pipe(
      startWith(''),
      map(color => this.filterColor(color))
    );
  }

  getCountries(){
    this.listingService.getCountries().subscribe((response: any) =>{
      this.countryList = response.array;
      this.country.setValue('');
      this.subscribeCountryChanges();
    })
  }

  subscribeCountryChanges() {
    this.filteredCountryList = this.country.valueChanges.pipe(
      startWith(''),
      map(country => this.filterCountry(country))
    );
  }

  getTypes(){
    this.listingService.getTypes().subscribe((response: any) =>{
      this.typeList = response.array;
      this.type.setValue('');
      this.subscribeTypeChanges();
    })
  }

  subscribeTypeChanges() {
    this.filteredTypeList = this.type.valueChanges.pipe(
      startWith(''),
      map(type => this.filterType(type))
    );
  }

  getFuel(){
    this.listingService.getFuel().subscribe((response: any) =>{
      this.fuelTypesList = response.array;
      this.fuel.setValue('');
      this.subscribeFuelChanges();
    })
  }

  subscribeFuelChanges() {
    this.filteredFuelList = this.fuel.valueChanges.pipe(
      startWith(''),
      map(fuel => this.filterFuel(fuel))
    );
  }

  getModels(id: string) {
    this.model.setValue('');
    this.listingService.getModels(id).subscribe((response: any) => {
      this.modelList = response.array;
      this.model.setValue('');
      this.subscribeModelChanges();
    });
  }

  subscribeModelChanges() {
    this.filteredModelList = this.model.valueChanges.pipe(
      startWith(''),
      map(model => this.filterModel(model)),
    );
  }

  filterModel(value: string){
    const filterValue = value.toLowerCase();
    return this.modelList.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  filterColor(value: string){
    const filterValue = value.toLowerCase();
    return this.colorsList.filter(option => option.color.toLowerCase().includes(filterValue));
  }

  filterCountry(value: string){
    const filterValue = value.toLowerCase();
    return this.countryList.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  filterType(value: string){
    const filterValue = value.toLowerCase();
    return this.typeList.filter(option => option.type.toLowerCase().includes(filterValue));
  }

  filterFuel(value: string){
    const filterValue = value.toLowerCase();
    return this.fuelTypesList.filter(option => option.fuel.toLowerCase().includes(filterValue));
  }

  filterMake(value: string){
    const filterValue = value.toLowerCase();
    return this.makeList?.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  get priceMin(){
    return this.searchform.get('priceMin');
  }

  get priceMax(){
    return this.searchform.get('priceMax');
  }

  get kmMin(){
    return this.searchform.get('kmMin');
  }

  get kmMax(){
    return this.searchform.get('kmMax');
  }

  get yearMin(){
    return this.searchform.get('yearMin');
  }

  get yearMax(){
    return this.searchform.get('yearMax');
  }


  submit() {
    this.router.navigate(['/results'],{
      queryParams: {
        make: this.selectedmake,
        model: this.selectedmodel,
        priceMin: this.priceMin?.value,
        priceMax: this.priceMax?.value,
        kmMin: this.kmMin?.value,
        kmMax: this.kmMax?.value,
        manufactureYearMin: this.yearMin?.value,
        manufactureYearMax: this.yearMax?.value,
        condition: this.condition,
        vehicleType: this.selectedtype,
        fuel: this.selectedfuel,
        color: this.selectedcolor,
        countryID: this.selectedcountry
      }
    })
  }
}
